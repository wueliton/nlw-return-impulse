import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit Feedback", () => {
  let submitFeedback: SubmitFeedbackUseCase;
  let createFeedbackSpy = jest.fn();
  let sendMailSpy = jest.fn();

  beforeEach(() => {
    submitFeedback = new SubmitFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy }
    );
  });

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,123456",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,123456",
      })
    ).rejects.toThrow();
  });

  it("should not be able submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,123456",
      })
    ).rejects.toThrow();
  });

  it("should not be able submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
