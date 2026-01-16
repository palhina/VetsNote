import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginUser } from "../../features/user";
import { renderWithProviders } from "../../testing/testUtils";

describe("LoginUser", () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ログインフォームが表示される", () => {
    renderWithProviders(<LoginUser />, {
      authValue: { login: mockLogin },
    });

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ログイン" })
    ).toBeInTheDocument();
  });

  it("メールアドレスとパスワードを入力してログインできる", async () => {
    mockLogin.mockResolvedValueOnce(undefined);

    renderWithProviders(<LoginUser />, {
      authValue: { login: mockLogin },
    });

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("メールアドレス"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("パスワード"), "password123");
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("ログイン失敗時にエラーメッセージが表示される", async () => {
    mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

    renderWithProviders(<LoginUser />, {
      authValue: { login: mockLogin },
    });

    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("メールアドレス"),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText("パスワード"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("ローディング中はボタンが無効化される", async () => {
    renderWithProviders(<LoginUser />, {
      authValue: { login: mockLogin, isLoading: true },
    });

    const button = screen.getByRole("button", { name: "ログイン中..." });
    expect(button).toBeDisabled();
  });
});
