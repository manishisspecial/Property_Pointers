/*!
 * PropertyPointers — client HTML shell integration
 * -------------------------------------------------
 * Loaded on every static PP_*.html page (via `<script defer src="/pp-shell.js"></script>`)
 * to bridge the gap between the client-authored static pages and the live
 * Next.js app:
 *
 *   1. AUTH STATE — swap the static "Login / Sign Up" buttons for the current
 *      user's avatar + a dashboard/logout dropdown when a session exists.
 *   2. FORM INTERCEPT — auto-submit any form with `data-pp-endpoint` to the
 *      Next.js API and show inline success / error feedback. Lets the client's
 *      hardcoded <form>s (Community Q&A, Society Reviews, Scam Reporter,
 *      Watchlist, Buyer Score) become live features without touching the HTML.
 *   3. CITY SYNC — read the same `pp_city` cookie the React CityContext writes
 *      so the client HTML picks up the user's selected city.
 *
 * This file is intentionally dependency-free and safe to load with `defer`.
 */
(function () {
  "use strict";

  // ---- Utilities -----------------------------------------------------------

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function getCookie(name) {
    var m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function toast(message, variant) {
    var el = document.createElement("div");
    el.textContent = message;
    el.setAttribute("role", "status");
    el.style.cssText =
      "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);" +
      "z-index:99999;padding:12px 20px;border-radius:12px;font-size:14px;" +
      "font-weight:600;font-family:'DM Sans',-apple-system,sans-serif;" +
      "box-shadow:0 12px 32px rgba(0,0,0,.18);letter-spacing:-.01em;";
    if (variant === "error") {
      el.style.background = "#FEF2F2";
      el.style.color = "#B91C1C";
      el.style.border = "1px solid #FECACA";
    } else {
      el.style.background = "#F0FDF4";
      el.style.color = "#166534";
      el.style.border = "1px solid #BBF7D0";
    }
    document.body.appendChild(el);
    setTimeout(function () {
      el.style.transition = "opacity .3s";
      el.style.opacity = "0";
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 350);
    }, 3200);
  }

  // ---- Auth state sync -----------------------------------------------------

  function renderUserMenu(user) {
    var login = document.querySelector(".btn-login");
    var signup = document.querySelector(".btn-signup");
    if (!login && !signup) return;

    var container = (login || signup).parentElement;
    if (login) login.remove();
    if (signup) signup.remove();

    var initial = (user.name || user.email || "U").trim().charAt(0).toUpperCase();
    var dashboardHref = "/dashboard";
    if (user.role === "admin") dashboardHref = "/admin";
    else if (user.role === "developer") dashboardHref = "/dashboard/developer";
    else if (user.role === "partner") dashboardHref = "/dashboard/partner";
    else if (user.role === "vendor") dashboardHref = "/dashboard/vendor";

    var wrap = document.createElement("div");
    wrap.className = "pp-user-menu";
    wrap.style.cssText =
      "position:relative;display:inline-flex;align-items:center;margin-right:8px;";
    wrap.innerHTML =
      '<button type="button" class="pp-user-btn" aria-label="Account menu" style="' +
      "display:flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;background:#F7F8FA;" +
      "border:1px solid #E5E7EB;border-radius:99px;cursor:pointer;font-family:inherit;" +
      "font-size:13px;font-weight:600;color:#080E1C;line-height:1;transition:all .15s;" +
      '">' +
      '<span style="width:26px;height:26px;border-radius:50%;background:#1847C4;color:#fff;' +
      'display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">' +
      initial +
      "</span>" +
      '<span class="pp-user-name" style="max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
      escapeHtml(user.name || "Account") +
      "</span>" +
      '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>' +
      "</button>" +
      '<div class="pp-user-drop" style="' +
      "position:absolute;top:calc(100% + 6px);right:0;min-width:220px;background:#fff;" +
      "border:1px solid #E5E7EB;border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,.12);" +
      "padding:6px;display:none;z-index:9999;" +
      '">' +
      '<div style="padding:10px 12px 8px;border-bottom:1px solid #F3F4F6;margin-bottom:4px;">' +
      '<div style="font-size:13px;font-weight:700;color:#080E1C;">' +
      escapeHtml(user.name || "Account") +
      "</div>" +
      '<div style="font-size:11px;color:#6B7280;margin-top:2px;">' +
      escapeHtml(user.email || "") +
      "</div>" +
      "</div>" +
      '<a href="' + dashboardHref + '" class="pp-drop-item" style="' +
      "display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;" +
      "text-decoration:none;color:#080E1C;font-size:13px;font-weight:500;" +
      '">Dashboard</a>' +
      '<a href="/dashboard?tab=favorites" class="pp-drop-item" style="' +
      "display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;" +
      "text-decoration:none;color:#080E1C;font-size:13px;font-weight:500;" +
      '">Favorites</a>' +
      (user.role === "admin"
        ? '<a href="/admin" class="pp-drop-item" style="' +
          "display:flex;align-items:center;gap:8px;padding:9px 12px;border-radius:8px;" +
          "text-decoration:none;color:#C49A2A;font-size:13px;font-weight:700;" +
          '">Admin Panel</a>'
        : "") +
      '<hr style="border:none;border-top:1px solid #F3F4F6;margin:6px 0;">' +
      '<button type="button" class="pp-logout-btn" style="' +
      "width:100%;text-align:left;padding:9px 12px;border-radius:8px;border:none;" +
      "background:transparent;color:#B91C1C;font-size:13px;font-weight:600;cursor:pointer;" +
      "font-family:inherit;" +
      '">Log out</button>' +
      "</div>";

    // Insert before other CTAs (Post Property + hamburger)
    var firstCta = container.querySelector(".btn-post, .hamburger");
    if (firstCta) container.insertBefore(wrap, firstCta);
    else container.appendChild(wrap);

    var btn = wrap.querySelector(".pp-user-btn");
    var drop = wrap.querySelector(".pp-user-drop");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      drop.style.display = drop.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function () {
      drop.style.display = "none";
    });
    wrap.querySelector(".pp-logout-btn").addEventListener("click", function () {
      fetch("/api/auth/logout", { method: "POST", credentials: "include" }).finally(function () {
        window.location.href = "/";
      });
    });

    // Hover styles via CSS injection (once per page)
    injectStyleOnce(
      "pp-shell-css",
      ".pp-user-btn:hover{background:#EEF2FF!important;border-color:#C7D2FE!important}" +
        ".pp-drop-item:hover{background:#F7F8FA!important}" +
        ".pp-logout-btn:hover{background:#FEF2F2!important}"
    );
  }

  function injectStyleOnce(id, css) {
    if (document.getElementById(id)) return;
    var s = document.createElement("style");
    s.id = id;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ---- Mega menu polish ----------------------------------------------------
  //
  // The static PP_*.html mega menus render the footer as a 5th sideways
  // column (because `.mega` is a flex row containing 4 `.mega-col`s + a
  // `.mega-footer` sibling) and the "AI Advisor" tile ships with an
  // unreadable dark-icon + white-title combo on a white dropdown. Instead of
  // touching every HTML file, we ship a single override stylesheet from the
  // shell so the fix applies everywhere.

  function injectMegaMenuFix() {
    injectStyleOnce(
      "pp-shell-mega-css",
      /* Layout: force the footer onto its own row and give columns a sane
         minimum so titles like "Should I Buy Now?" don't wrap into 3 lines. */
      ".mega{" +
        "display:none;" +
        "flex-wrap:wrap!important;" +
        "min-width:960px!important;" +
        "max-width:min(1160px,96vw)!important;" +
        "padding:0!important;" +
        "border-radius:20px!important;" +
        "border:1px solid rgba(229,231,235,.9)!important;" +
        "box-shadow:0 24px 64px rgba(8,14,28,.16),0 2px 8px rgba(8,14,28,.05)!important;" +
        "overflow:hidden!important;" +
        "z-index:401!important;" +
      "}" +
      ".mega.show{display:flex!important;}" +
      ".mega-col{" +
        "flex:1 1 0!important;" +
        "min-width:218px!important;" +
        "padding:18px 12px!important;" +
      "}" +
      ".mega-col+.mega-col{border-left:1px solid #F3F4F6!important;}" +
      ".mega-col-hd{" +
        "font-size:10px!important;" +
        "font-weight:800!important;" +
        "letter-spacing:.11em!important;" +
        "color:#6B7280!important;" +
        "padding:0 10px 12px!important;" +
      "}" +
      ".mega-item{" +
        "padding:9px 10px!important;" +
        "gap:11px!important;" +
        "border-radius:11px!important;" +
        "align-items:center!important;" +
        "transition:background .15s,transform .15s!important;" +
      "}" +
      ".mega-item:hover{background:#F7F8FA!important;transform:translateX(2px);}" +
      ".mega-icon{" +
        "width:36px!important;height:36px!important;" +
        "border-radius:10px!important;" +
        "font-size:11px!important;font-weight:800!important;" +
        "color:#374151!important;letter-spacing:-.02em!important;" +
        "box-shadow:inset 0 0 0 1px rgba(15,23,42,.04);" +
      "}" +
      ".mega-title{" +
        "font-size:13px!important;font-weight:700!important;" +
        "color:#080E1C!important;line-height:1.25!important;" +
        "margin-bottom:3px!important;" +
      "}" +
      ".mega-desc{" +
        "font-size:11px!important;color:#9CA3AF!important;" +
        "line-height:1.5!important;" +
      "}" +
      ".mega-badge{" +
        "font-size:9px!important;font-weight:800!important;" +
        "padding:2px 7px!important;border-radius:99px!important;" +
        "margin-left:6px!important;vertical-align:2px!important;" +
        "letter-spacing:.02em;" +
      "}" +
      /* Footer: full-width row that always sits at the bottom, regardless
         of the number of columns preceding it. */
      ".mega-footer{" +
        "flex:1 1 100%!important;order:999!important;" +
        "border-top:1px solid #F3F4F6!important;" +
        "background:#FAFBFC!important;" +
        "padding:12px 20px!important;" +
        "display:flex!important;align-items:center!important;" +
        "justify-content:space-between!important;" +
      "}" +
      ".mega-footer span{font-size:12px!important;color:#6B7280!important;font-weight:500!important;}" +
      ".mega-footer a{" +
        "font-size:12px!important;font-weight:700!important;color:#1847C4!important;" +
        "padding:6px 14px;border-radius:99px;background:#EEF2FF;" +
        "transition:background .15s,color .15s;" +
      "}" +
      ".mega-footer a:hover{background:#1847C4!important;color:#fff!important;}" +
      /* Dark "AI Advisor" tile: detect by its distinctive icon background
         and wrap the whole item in a matching dark card so the title
         (which the source HTML hard-codes to white) is actually readable. */
      ".mega-item:has(.mega-icon[style*=\"#0D1117\"]),.mega-item:has(.mega-icon[style*=\"0D1117\"]){" +
        "background:linear-gradient(135deg,#0D1117 0%,#1F2937 100%)!important;" +
        "border:1px solid rgba(232,201,122,.22);" +
      "}" +
      ".mega-item:has(.mega-icon[style*=\"#0D1117\"]):hover,.mega-item:has(.mega-icon[style*=\"0D1117\"]):hover{" +
        "background:linear-gradient(135deg,#111827 0%,#374151 100%)!important;" +
      "}" +
      ".mega-item:has(.mega-icon[style*=\"#0D1117\"]) .mega-icon,.mega-item:has(.mega-icon[style*=\"0D1117\"]) .mega-icon{" +
        "background:rgba(232,201,122,.15)!important;" +
        "color:#E8C97A!important;" +
        "box-shadow:inset 0 0 0 1px rgba(232,201,122,.3);" +
      "}" +
      ".mega-item:has(.mega-icon[style*=\"#0D1117\"]) .mega-title,.mega-item:has(.mega-icon[style*=\"0D1117\"]) .mega-title{" +
        "color:#fff!important;" +
      "}" +
      ".mega-item:has(.mega-icon[style*=\"#0D1117\"]) .mega-desc,.mega-item:has(.mega-icon[style*=\"0D1117\"]) .mega-desc{" +
        "color:rgba(255,255,255,.62)!important;" +
      "}" +
      ".mega-item:has(.mega-icon[style*=\"#0D1117\"]) .mega-badge,.mega-item:has(.mega-icon[style*=\"0D1117\"]) .mega-badge{" +
        "background:rgba(232,201,122,.2)!important;color:#E8C97A!important;" +
      "}" +
      /* Legacy browsers that don't support :has() get a graceful fallback:
         at least ensure the white-on-white title becomes visible. */
      "@supports not selector(:has(*)){" +
        ".mega-item .mega-title[style*=\"color:#fff\"]{color:#080E1C!important;}" +
        ".mega-icon[style*=\"#0D1117\"]{color:#E8C97A!important;}" +
      "}" +
      /* Below the desktop breakpoint the static HTML already hides
         .nav-links entirely; belt-and-braces guard so a stale .show
         class from a resize can't leave the mega visible on mobile. */
      "@media(max-width:1024px){.mega{display:none!important;}}"
    );
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function loadAuth() {
    fetch("/api/auth/me", { credentials: "include" })
      .then(function (r) {
        if (!r.ok) return null;
        return r.json();
      })
      .then(function (data) {
        if (data && data.user) {
          window.__ppUser = data.user;
          renderUserMenu(data.user);
        }
      })
      .catch(function () {
        /* stay signed-out */
      });
  }

  // ---- Form intercept ------------------------------------------------------
  //
  // Any <form data-pp-endpoint="/api/x" data-pp-success="Thanks!"> in the
  // client HTML will be posted to /api/x as JSON. On success, a toast is
  // shown; on error, a toast with the server message.
  //
  // A form can also opt into JSON serialization of only specific fields via
  // data-pp-fields="a,b,c" (defaults to all named inputs).

  function collectFormData(form) {
    var only = (form.getAttribute("data-pp-fields") || "").split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
    var data = {};
    var els = form.querySelectorAll("input[name],select[name],textarea[name]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (only.length && only.indexOf(el.name) === -1) continue;
      if (el.type === "checkbox") data[el.name] = el.checked;
      else if (el.type === "radio") {
        if (el.checked) data[el.name] = el.value;
      } else data[el.name] = el.value;
    }
    return data;
  }

  function setBusy(form, busy) {
    var btn = form.querySelector('[type="submit"], button:not([type="button"])');
    if (!btn) return;
    if (busy) {
      btn.dataset.ppLabel = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;
      btn.style.opacity = "0.7";
    } else {
      if (btn.dataset.ppLabel) btn.textContent = btn.dataset.ppLabel;
      btn.disabled = false;
      btn.style.opacity = "1";
    }
  }

  function initFormIntercept() {
    document.addEventListener("submit", function (e) {
      var form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      var endpoint = form.getAttribute("data-pp-endpoint");
      if (!endpoint) return;

      e.preventDefault();
      var successMsg = form.getAttribute("data-pp-success") || "Submitted successfully.";
      var redirect = form.getAttribute("data-pp-redirect");
      setBusy(form, true);

      fetch(endpoint, {
        method: (form.getAttribute("data-pp-method") || "POST").toUpperCase(),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(collectFormData(form)),
      })
        .then(function (r) {
          return r.json().then(function (body) {
            return { ok: r.ok, status: r.status, body: body };
          });
        })
        .then(function (res) {
          setBusy(form, false);
          if (!res.ok) {
            toast(res.body && res.body.error ? res.body.error : "Something went wrong.", "error");
            return;
          }
          toast(successMsg, "success");
          form.reset();
          if (redirect) setTimeout(function () { window.location.href = redirect; }, 900);
        })
        .catch(function () {
          setBusy(form, false);
          toast("Network error. Please try again.", "error");
        });
    });
  }

  // ---- Watchlist toggles ---------------------------------------------------
  //
  // Elements marked with data-pp-watchlist="<developerSlug>" become add/remove
  // toggles that call /api/watchlist. Useful for the Builder Watchlist page.

  function initWatchlistButtons() {
    var buttons = document.querySelectorAll("[data-pp-watchlist]");
    if (!buttons.length) return;

    fetch("/api/watchlist", { credentials: "include" })
      .then(function (r) { return r.ok ? r.json() : { items: [] }; })
      .then(function (data) {
        var set = {};
        (data.items || []).forEach(function (it) { set[it.developerSlug] = true; });
        buttons.forEach(function (btn) {
          var slug = btn.getAttribute("data-pp-watchlist");
          setWatchState(btn, !!set[slug]);
        });
      })
      .catch(function () {});

    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-pp-watchlist]");
      if (!btn) return;
      e.preventDefault();
      var slug = btn.getAttribute("data-pp-watchlist");
      var on = btn.getAttribute("data-pp-watch-state") === "on";
      fetch("/api/watchlist", {
        method: on ? "DELETE" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ developerSlug: slug }),
      })
        .then(function (r) {
          if (r.status === 401) {
            toast("Please log in to save to your watchlist.", "error");
            setTimeout(function () { window.location.href = "/auth/login"; }, 1200);
            return null;
          }
          if (!r.ok) throw new Error("bad");
          setWatchState(btn, !on);
          toast(on ? "Removed from watchlist." : "Added to watchlist.", "success");
        })
        .catch(function () { toast("Could not update watchlist.", "error"); });
    });
  }

  function setWatchState(btn, on) {
    btn.setAttribute("data-pp-watch-state", on ? "on" : "off");
    var label = btn.querySelector("[data-pp-watch-label]");
    if (label) label.textContent = on ? "Saved" : "Save";
    btn.style.background = on ? "#080E1C" : "";
    btn.style.color = on ? "#fff" : "";
  }

  // ---- Page-specific handlers ---------------------------------------------
  //
  // The client HTML defines stub functions like `submitScam()` and
  // `submitReview()` in inline <script> at the end of <body>. Those inline
  // scripts run BEFORE this deferred script, so overriding the globals here
  // makes the "submit" buttons actually call our APIs.

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? (el.value || "").trim() : "";
  }

  function showThanks(formId, thanksId) {
    var form = document.getElementById(formId);
    var thanks = document.getElementById(thanksId);
    if (form) form.style.display = "none";
    if (thanks) thanks.style.display = "block";
  }

  // --- Scam Reporter (PP_SCAM_REPORTER.html)
  window.submitScam = function () {
    var subjectType = getVal("sc_type");
    var subjectName = getVal("sc_entity");
    var city = getVal("sc_city");
    var description = getVal("sc_desc");
    // Reporter contact fields are optional in the client HTML — we'll take
    // whatever the browser prefilled from a signed-in session, else fall
    // back to anonymous reporter details built from the form.
    if (!subjectType || !subjectName || !city || !description) {
      toast("Please fill all required fields.", "error");
      return;
    }
    fetch("/api/trust-safety/scam-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        subjectType: subjectType,
        subjectName: subjectName,
        city: city,
        description: description,
        reporterName: "Anonymous reporter",
        reporterEmail: "anonymous@propertypointers.local",
        anonymous: true,
      }),
    })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, body: b }; }); })
      .then(function (res) {
        if (!res.ok) {
          toast(res.body.error || "Could not submit report.", "error");
          return;
        }
        showThanks("sc_form", "sc_thanks");
        toast(res.body.message || "Report received. Thank you.", "success");
      })
      .catch(function () { toast("Network error. Please try again.", "error"); });
  };

  // --- Society Reviews (PP_SOCIETY_REVIEWS.html)
  window.submitReview = function () {
    var societyName = getVal("rv_soc");
    var city = getVal("rv_city");
    var yearsResiding = Number(getVal("rv_since")) || null;
    var comment = getVal("rv_text");
    if (!societyName || !city || !comment) {
      toast("Please fill all required fields.", "error");
      return;
    }
    var rv = window.ratingVals || {};
    if (!rv.water || !rv.power || !rv.security || !rv.maint || !rv.rwa) {
      toast("Please rate all 5 categories.", "error");
      return;
    }
    // Map the client's 5 sub-ratings to our 4-plus-overall model.
    var overall = Math.round((rv.water + rv.power + rv.security + rv.maint + rv.rwa) / 5);
    fetch("/api/community/society-reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        societyName: societyName,
        city: city,
        locality: city, // client form doesn't ask locality separately; fall back to city
        yearsResiding: yearsResiding,
        comment: comment,
        ratingOverall: overall,
        ratingAmen: rv.water, // best-fit mapping
        ratingMaint: rv.maint,
        ratingSafety: rv.security,
        ratingConstr: rv.power,
        authorName: (window.__ppUser && window.__ppUser.name) || "Anonymous resident",
      }),
    })
      .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, body: b }; }); })
      .then(function (res) {
        if (!res.ok) {
          toast(res.body.error || "Could not submit review.", "error");
          return;
        }
        showThanks("rv_form", "rv_thanks");
        toast("Review submitted. Thanks for sharing!", "success");
      })
      .catch(function () { toast("Network error. Please try again.", "error"); });
  };

  // --- Community Q&A (PP_COMMUNITY_QA.html): auto-wire the .ask-box button ---
  function initCommunityQA() {
    var box = document.querySelector(".ask-box");
    if (!box) return;
    var titleInput = box.querySelector(".ask-inp");
    var bodyTa = box.querySelector(".ask-ta");
    var buttons = box.querySelectorAll("button");
    if (!titleInput || !bodyTa || !buttons.length) return;
    // The "Post Question" is the first <button> in the box; the second CTA is
    // an <a> to /tools/ai-advisor.
    var submitBtn = buttons[0];
    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var title = (titleInput.value || "").trim();
      var body = (bodyTa.value || "").trim();
      if (title.length < 8) return toast("Question title must be at least 8 characters.", "error");
      if (body.length < 20) return toast("Please add at least 20 characters of context.", "error");
      var activePill = box.querySelector(".cat-pill.on");
      var category = "general";
      if (activePill) {
        var label = activePill.textContent.trim().toLowerCase();
        if (label.indexOf("rera") >= 0 || label.indexOf("legal") >= 0) category = "legal";
        else if (label.indexOf("locality") >= 0) category = "locality";
        else if (label.indexOf("builder") >= 0) category = "buying";
        else if (label.indexOf("investment") >= 0) category = "investment";
        else if (label.indexOf("nri") >= 0) category = "nri";
        else if (label.indexOf("loan") >= 0) category = "loan";
        else if (label.indexOf("vastu") >= 0) category = "vastu";
      }
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.6";
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "Posting…";
      fetch("/api/community/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: title,
          body: body,
          category: category,
          authorName: (window.__ppUser && window.__ppUser.name) || "Anonymous",
          authorEmail: (window.__ppUser && window.__ppUser.email) || undefined,
        }),
      })
        .then(function (r) { return r.json().then(function (b) { return { ok: r.ok, body: b }; }); })
        .then(function (res) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.textContent = originalText;
          if (!res.ok) return toast(res.body.error || "Could not post question.", "error");
          toast("Question submitted. Our team will approve it shortly.", "success");
          titleInput.value = "";
          bodyTa.value = "";
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.textContent = originalText;
          toast("Network error. Please try again.", "error");
        });
    });

    // Category-pill selection (single-select)
    box.querySelectorAll(".cat-pill").forEach(function (pill) {
      pill.addEventListener("click", function () {
        box.querySelectorAll(".cat-pill").forEach(function (p) { p.classList.remove("on"); });
        pill.classList.add("on");
      });
    });
  }

  // --- Boot ----------------------------------------------------------------

  ready(function () {
    injectMegaMenuFix();
    loadAuth();
    initFormIntercept();
    initWatchlistButtons();
    initCommunityQA();
  });
})();
