const tooltipTriggers = document.querySelectorAll("[data-tooltip-target]");

tooltipTriggers.forEach((trigger) => {
  const tooltipId = trigger.getAttribute("data-tooltip-target");
  const tooltip = tooltipId ? document.getElementById(tooltipId) : null;

  if (!tooltip) {
    return;
  }

  const showTooltip = () => {
    tooltip.hidden = false;
  };

  const hideTooltip = () => {
    tooltip.hidden = true;
  };

  trigger.addEventListener("mouseenter", showTooltip);
  trigger.addEventListener("mouseleave", hideTooltip);
  trigger.addEventListener("focus", showTooltip);
  trigger.addEventListener("blur", hideTooltip);
});

const switches = document.querySelectorAll('.ds-switch[role="switch"]:not([disabled])');

switches.forEach((control) => {
  control.addEventListener("click", () => {
    const isChecked = control.getAttribute("aria-checked") === "true";
    control.setAttribute("aria-checked", String(!isChecked));
  });
});

const dialogOpeners = document.querySelectorAll("[data-dialog-open]");
const dialogClosers = document.querySelectorAll("[data-dialog-close]");

dialogOpeners.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.getAttribute("data-dialog-open");
    const dialog = dialogId ? document.getElementById(dialogId) : null;
    const firstFocusable = dialog?.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");

    if (!dialog) {
      return;
    }

    dialog.hidden = false;
    dialog.dataset.returnFocus = "true";
    dialog.dataset.triggerId = button.id || "";
    firstFocusable?.focus();
  });
});

dialogClosers.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.getAttribute("data-dialog-close");
    const dialog = dialogId ? document.getElementById(dialogId) : null;

    if (!dialog) {
      return;
    }

    dialog.hidden = true;

    const opener = document.querySelector(`[data-dialog-open="${dialogId}"]`);
    if (opener instanceof HTMLElement) {
      opener.focus();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const openDialog = document.querySelector(".dialog-scrim:not([hidden])");
  if (!(openDialog instanceof HTMLElement)) {
    return;
  }

  openDialog.hidden = true;
  const dialogId = openDialog.id;
  const opener = document.querySelector(`[data-dialog-open="${dialogId}"]`);

  if (opener instanceof HTMLElement) {
    opener.focus();
  }
});
