const rp = require("request-promise");
const { forEachLimit } = require("async");
const cheerio = require("cheerio");
const ora = require("ora");

const { geo, defaultItemLimit, limit } = require("../../../Constants");

const INIT_OPTIONS = {
  number: defaultItemLimit,
  page: 1,
  cookie: "",
  asyncTasks: 5,
  sort: false,
};

class AmazonScraper {
  constructor({
    keyword,
    number,
    proxy,
    asin,
    sort,
    ua,
    timeout,
    randomUa,
    cookie,
    geo,
    asyncTasks,
  }) {
    this.asyncTasks = asyncTasks;
    this.asyncPage = 1;
    this.mainHost = `https://${geo.host}`;
    this.geo = geo;
    this.cookie = cookie;
    this.collector = [];
    this.keyword = keyword;
    this.number = parseInt(number, 10);
    this.proxy = proxy;
    this.asin = asin;
    this.sort = sort;
    this.timeout = timeout;
    this.randomUa = randomUa;
    this.totalProducts = 0;

    this.initTime = Date.now();
    this.ua =
      ua ||
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36";
  }

  static async products(options) {
    options = { ...INIT_OPTIONS, ...options };
    options.geo = geo["US"];
    try {
      const data = await new AmazonScraper(options).startScraper();
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user agent
   * if randomUa then user agent version will be randomized, this helps to prevent request blocking from the amazon side
   */
  get userAgent() {
    return this.randomUa
      ? `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${
          Math.floor(Math.random() * 14) + 65
        }.0.4044.113 Safari/537.36`
      : this.ua;
  }

  get getProxy() {
    if (Array.isArray(this.proxy)) {
      return this.proxy[Math.floor(Math.random() * this.proxy.length)];
    }

    return "";
  }

  /**
   * Main request method
   * @param {*} param0
   */
  httpRequest({ uri, headers, method, qs, json, body, form }) {
    return new Promise(async (resolve, reject) => {
      const options = {
        uri: uri ? `${this.mainHost}/${uri}` : this.mainHost,
        method,
        ...(qs ? { qs } : {}),
        ...(body ? { body } : {}),
        ...(form ? { form } : {}),
        headers: {
          "user-agent": this.userAgent,
          ...headers,
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.5",
          "accept-encoding": "gzip, deflate, br",
          te: "trailers",
        },
        ...(json ? { json: true } : {}),
        gzip: true,
        resolveWithFullResponse: true,
        ...(this.getProxy ? { proxy: `http://${this.getProxy}/` } : {}),
      };
      try {
        const response = await rp(options);
        setTimeout(() => {
          resolve(response);
        }, this.timeout);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Start scraper
   */
  async startScraper() {
    this.asyncPage = Math.ceil(this.number / 15);
    if (!this.keyword) {
      throw new Error("Keyword is missing");
    }
    if (this.number > limit.product) {
      throw new Error(
        `Wow.... slow down cowboy. Maximum you can get is ${limit.product} products`
      );
    }

    await this.mainLoop();
    this.sortAndFilterResult();

    return {
      totalProducts: this.totalProducts,
      result: this.collector,
    };
  }

  /**
   * Main loop that collects data
   */
  async mainLoop() {
    return new Promise((resolve) => {
      forEachLimit(
        Array.from({ length: this.asyncPage }, (_, k) => k + 1),
        this.asyncTasks,
        async (item) => {
          const body = await this.buildRequest(item);

          let totalResultCount = body.match(/"totalResultCount":\w+(.[0-9])/gm);

          if (totalResultCount) {
            this.totalProducts = totalResultCount[0].split(
              'totalResultCount":'
            )[1];
          }
          this.grabProduct(body, item);
        },
        () => {
          resolve();
        }
      );
    });
  }

  sortAndFilterResult() {
    this.collector.sort((a, b) => a.absolute_position - b.absolute_position);
    this.collector.forEach((item, index) => {
      item.absolute_position = index += 1;
    });
  }

  /**
   * Create request
   */
  async buildRequest(page) {
    const options = {
      method: "GET",
      uri: "s",
      qs: {
        k: this.keyword,
        ...(page > 1 ? { page, ref: `sr_pg_${page}` } : {}),
      },
      headers: {
        referer: this.mainHost,
        cookie: this.cookie,
      },
    };

    try {
      const response = await this.httpRequest(options);
      return response.body;
    } catch (error) {
      throw error.message;
    }
  }

  grabProduct(body, p) {
    const $ = cheerio.load(body.replace(/\s\s+/g, "").replace(/\n/g, ""));
    const productList = $("div[data-index]");
    const scrapingResult = {};

    if (productList.length < 10) {
      throw new Error("No more products");
    }
    let position = 0;
    for (let i = 0; i < productList.length; i++) {
      const asin = productList[i].attribs["data-asin"];
      if (!asin) {
        continue;
      }

      scrapingResult[asin] = {
        asin,
        absolute_position: `${p}${i}`,
        page: p,
        position: (position += 1),
      };
    }

    for (let key in scrapingResult) {
      this.collector.push(scrapingResult[key]);
    }
    return;
  }
}

module.exports = AmazonScraper;
