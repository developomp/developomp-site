# https://devenv.sh/reference/options

{ pkgs, ... }:

{
  packages = with pkgs; [
    nixd
    nixfmt-rfc-style

    # version must match what's defined in package.json
    playwright-driver
  ];

  env = {
    PLAYWRIGHT_BROWSERS_PATH = pkgs.playwright-driver.browsers;
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = true;
  };

  languages = {
    # https://devenv.sh/supported-languages/javascript
    javascript = {
      enable = true;
      package = pkgs.nodejs_20;

      pnpm = {
        enable = true;
        install.enable = true;
      };
    };
  };
}
