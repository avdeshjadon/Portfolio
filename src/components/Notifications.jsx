import React from "react";

export default function Notifications({ items = [] }) {
  return (
    <div id="notification-container" aria-live="polite" aria-atomic="true">
      {items.map((t) => (
        <div key={t.id} className={`toast ${t.type || ""} show`} role="status">{t.msg}</div>
      ))}
    </div>
  );
}
