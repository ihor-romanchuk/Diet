class Config {
  static get baseUrl() {
    return window.location.href.includes("localhost")
      ? "http://localhost:44340"
      : "";
  }

  static get apiUrl() {
    return window.location.href.includes("localhost")
      ? "http://localhost:44340/api"
      : "/api";
  }
}

export default Config;
