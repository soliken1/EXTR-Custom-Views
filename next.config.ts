module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://extr-fri730-704ba95d817c.herokuapp.com/api/:path*",
      },
    ];
  },
};
