// The exact campaign cutoff is unknown; archive after the stated date has passed everywhere.
if (Date.now() >= Date.parse("2026-10-30T00:00:00Z")) {
  const status = document.getElementById("referral-status");
  const link = document.getElementById("referral-link");
  if (status && link) {
    status.textContent = "本期所述的 2026 年 10 月 28 日已过。以下是历史活动记录，请不要按旧金额和任务注册；如有新活动，请联系 Evan 并核对 App 当前条款。";
    link.removeAttribute("href");
    link.setAttribute("aria-disabled", "true");
    link.textContent = "本期邀请入口已归档";
  }
}
