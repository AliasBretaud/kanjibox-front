import type { Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async loginWithUser(username: string, password: string) {
    await this.page.goto("http://localhost:3000/en");
    const profile = this.page.getByTestId("profile-menu");
    if ((await profile.count()) === 0) {
      await this.page.goto("http://localhost:3000/api/auth/login");
      const email = this.page.getByLabel("Email address");
      const pass = this.page.getByLabel("Password");
      const button = this.page.getByRole("button", { name: "Continue" });
      await email.fill(username);
      await pass.fill(password);
      await button.click();
      await this.page.waitForURL("http://localhost:3000/en");
    }
  }
}
