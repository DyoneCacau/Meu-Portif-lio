/**
 * Renderiza o portfólio a partir de portfolioData (js/data.js)
 * e controla navegação, detalhes expansíveis e animações leves.
 */

(function () {
  const data = window.portfolioData;
  if (!data) {
    console.error("portfolioData não encontrado. Verifique js/data.js.");
    return;
  }

  const isPlaceholder = (value) =>
    typeof value === "string" &&
    (value.includes("[") || value.trim() === "");

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const textClass = (value) =>
    isPlaceholder(value) ? "placeholder-text" : "";

  /* ---------- Campos globais (nome, tagline etc.) ---------- */

  function fillGlobalFields() {
    document.querySelectorAll("[data-field]").forEach((el) => {
      const key = el.getAttribute("data-field");
      if (key && data[key] != null) {
        el.textContent = data[key];
      }
    });

    document.title = `Portfólio — ${data.name}`;
  }

  /* ---------- Hero visual (foto cutout) ---------- */

  function renderHeroVisual() {
    const mount = document.getElementById("hero-visual");
    if (!mount) return;

    if (data.photoEnabled && data.photo) {
      mount.innerHTML = `
        <img
          class="hero-cutout"
          src="${escapeHtml(data.photo)}"
          alt="${escapeHtml(data.photoAlt || data.name)}"
        />
      `;
      return;
    }

    mount.innerHTML = `
      <div class="hero-cutout-fallback">
        Espaço para sua foto sem fundo — ative em js/data.js
      </div>
    `;
  }

  function renderHeroPanels() {
    const mount = document.getElementById("hero-panels");
    if (!mount) return;

    const panels = data.heroPanels || [];
    mount.innerHTML = panels
      .map(
        (panel) => `
        <article class="hero-panel">
          <h3>${escapeHtml(panel.title)}</h3>
          <p>${escapeHtml(panel.text)}</p>
          <a href="${escapeHtml(panel.href)}">${escapeHtml(panel.linkLabel)}</a>
        </article>
      `
      )
      .join("");
  }

  /* ---------- Sobre ---------- */

  function renderAbout() {
    const mount = document.getElementById("about-content");
    const aboutTitle = document.getElementById("sobre-title");
    if (!mount || !data.about) return;

    if (aboutTitle) aboutTitle.textContent = data.about.title;

    mount.innerHTML = data.about.paragraphs
      .map(
        (p) =>
          `<p class="${textClass(p)}">${escapeHtml(p)}</p>`
      )
      .join("");
  }

  /* ---------- Projetos ---------- */

  function renderToolsTags(tools) {
    if (!Array.isArray(tools) || tools.length === 0) {
      return `<span class="tag tag--placeholder">[FERRAMENTAS UTILIZADAS]</span>`;
    }

    return tools
      .map((tool) => {
        const placeholder = isPlaceholder(tool);
        return `<span class="tag${placeholder ? " tag--placeholder" : ""}">${escapeHtml(tool)}</span>`;
      })
      .join("");
  }

  function getStackImages(project) {
    const fromGallery = Array.isArray(project.gallery)
      ? project.gallery.filter((item) => item && item.src)
      : [];

    if (fromGallery.length) {
      return fromGallery.slice(0, 4);
    }

    if (project.image) {
      return [
        {
          src: project.image,
          alt: project.imageAlt || project.name || "Captura de tela",
        },
      ];
    }

    return [];
  }

  function renderProjectMedia(project) {
    const stack = getStackImages(project);

    if (!stack.length) {
      return `
        <div class="project__media">
          <p class="project__media-placeholder">
            <span aria-hidden="true"></span>
            Espaço para captura de tela — adicione o caminho em image
          </p>
        </div>
      `;
    }

    const payload = encodeURIComponent(JSON.stringify(stack));
    const dots = stack
      .map(
        (item, i) => `
        <button
          type="button"
          class="screen-stack__dot${i === 0 ? " is-active" : ""}"
          data-stack-index="${i}"
          aria-label="${escapeHtml(item.alt || `Tela ${i + 1}`)}"
          aria-pressed="${i === 0 ? "true" : "false"}"
        ></button>
      `
      )
      .join("");

    return `
      <div class="project__media project__media--stack">
        <div
          class="screen-stack${stack.length === 1 ? " screen-stack--single" : ""}"
          data-screen-stack
          data-images="${payload}"
          data-active="0"
        >
          <button type="button" class="screen-stack__card screen-stack__card--back" data-stack-layer="back" aria-label="Mostrar tela de fundo"></button>
          <button type="button" class="screen-stack__card screen-stack__card--mid" data-stack-layer="mid" aria-label="Mostrar tela do meio"></button>
          <button type="button" class="screen-stack__card screen-stack__card--front" data-stack-layer="front" aria-label="Próxima tela"></button>
          <div class="screen-stack__meta">
            <p class="screen-stack__caption" data-stack-caption>${escapeHtml(stack[0].alt || project.name || "")}</p>
            <div class="screen-stack__dots" role="tablist" aria-label="Telas do projeto">
              ${dots}
            </div>
            <p class="screen-stack__hint">Clique nas telas ou nos pontos para alternar</p>
          </div>
        </div>
      </div>
    `;
  }

  function readStackImages(root) {
    try {
      return JSON.parse(
        decodeURIComponent(root.getAttribute("data-images") || "%5B%5D")
      );
    } catch {
      return [];
    }
  }

  function paintStack(root, active) {
    const images = readStackImages(root);
    if (!images.length) return;

    const total = images.length;
    const index = ((active % total) + total) % total;
    root.setAttribute("data-active", String(index));

    const front = images[index];
    const mid = images[(index + 1) % total];
    const back = images[(index + 2) % total];

    const layers = {
      front: root.querySelector('[data-stack-layer="front"]'),
      mid: root.querySelector('[data-stack-layer="mid"]'),
      back: root.querySelector('[data-stack-layer="back"]'),
    };

    const apply = (el, item, label) => {
      if (!el || !item) return;
      el.innerHTML = `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || label)}" loading="eager" decoding="async" />`;
      el.setAttribute("aria-label", item.alt || label);
    };

    apply(layers.front, front, "Tela principal");
    apply(layers.mid, mid || front, "Tela seguinte");
    apply(layers.back, back || mid || front, "Tela anterior");

    if (total < 3 && layers.back) {
      layers.back.hidden = total < 2;
    }
    if (total < 2 && layers.mid) {
      layers.mid.hidden = true;
      if (layers.back) layers.back.hidden = true;
    }

    const caption = root.querySelector("[data-stack-caption]");
    if (caption) caption.textContent = front.alt || "";

    root.querySelectorAll(".screen-stack__dot").forEach((dot, i) => {
      const on = i === index;
      dot.classList.toggle("is-active", on);
      dot.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setupScreenStacks() {
    document.querySelectorAll("[data-screen-stack]").forEach((root) => {
      paintStack(root, 0);

      root.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const dot = target.closest("[data-stack-index]");
        if (dot) {
          paintStack(root, Number(dot.getAttribute("data-stack-index") || 0));
          return;
        }

        const layer = target.closest("[data-stack-layer]");
        if (!layer) return;

        const active = Number(root.getAttribute("data-active") || 0);
        const images = readStackImages(root);
        if (images.length < 2) return;

        const role = layer.getAttribute("data-stack-layer");
        if (role === "front") {
          paintStack(root, active + 1);
        } else if (role === "mid") {
          paintStack(root, active + 1);
        } else if (role === "back") {
          paintStack(root, active + 2);
        }
      });
    });
  }

  function renderProjectLink(project) {
    const links = [];

    if (project.link && !isPlaceholder(project.link)) {
      links.push(`
        <a
          class="btn btn--ghost btn--small"
          href="${escapeHtml(project.link)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          ${escapeHtml(project.linkLabel || "Ver demonstração")}
        </a>
      `);
    }

    /* Link de repositório mantido em data.js, mas oculto na interface.
    if (project.repoLink && !isPlaceholder(project.repoLink)) {
      links.push(`
        <a
          class="btn btn--ghost btn--small"
          href="${escapeHtml(project.repoLink)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repositório
        </a>
      `);
    }
    */

    if (!links.length) {
      return `
        <span class="btn btn--ghost btn--small" style="opacity:0.55;cursor:default" aria-disabled="true">
          ${escapeHtml(project.linkLabel || "[LINK DO PROJETO]")}
        </span>
      `;
    }

    return links.join("");
  }

  function renderGallery(project) {
    const items = Array.isArray(project.gallery)
      ? project.gallery.filter((item) => item && item.src)
      : [];

    if (!items.length) return "";

    return `
      <div class="project-gallery">
        <h4>Telas do sistema</h4>
        <div class="project-gallery__grid">
          ${items
            .map(
              (item) => `
            <figure class="project-gallery__item">
              <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || project.name)}" loading="lazy" />
              ${item.alt ? `<figcaption>${escapeHtml(item.alt)}</figcaption>` : ""}
            </figure>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderProjects() {
    const mount = document.getElementById("projects-list");
    if (!mount || !data.projects) return;

    mount.innerHTML = data.projects
      .map((project, index) => {
        const detailsId = `project-details-${project.id}`;
        return `
          <article class="project reveal" style="transition-delay:${index * 80}ms" data-project="${escapeHtml(project.id)}">
            <div class="project__top">
              <div class="project__body">
                <h3 class="project__name">${escapeHtml(project.name)}</h3>
                <p class="project__desc ${textClass(project.shortDescription)}">
                  ${escapeHtml(project.shortDescription)}
                </p>
                <div class="project__meta">
                  <div>
                    <h4>Problema / necessidade</h4>
                    <p class="${textClass(project.problem)}">${escapeHtml(project.problem)}</p>
                  </div>
                  <div>
                    <h4>O que o projeto faz</h4>
                    <p class="${textClass(project.whatItDoes)}">${escapeHtml(project.whatItDoes)}</p>
                  </div>
                  <div>
                    <h4>Ferramentas utilizadas</h4>
                    <div class="tools-list">${renderToolsTags(project.tools)}</div>
                  </div>
                  <div>
                    <h4>Processo com IA</h4>
                    <p class="${textClass(project.aiProcess)}">${escapeHtml(project.aiProcess)}</p>
                  </div>
                </div>
                <div class="project__actions">
                  <button
                    class="btn btn--primary btn--small"
                    type="button"
                    data-toggle-details="${detailsId}"
                    aria-expanded="false"
                    aria-controls="${detailsId}"
                  >
                    Ver detalhes
                  </button>
                  ${renderProjectLink(project)}
                </div>
              </div>
              ${renderProjectMedia(project)}
            </div>
            <div
              class="project__details"
              id="${detailsId}"
              data-open="false"
              role="region"
              aria-label="Detalhes de ${escapeHtml(project.name)}"
            >
              <div class="details-grid">
                <article>
                  <h4>Contexto</h4>
                  <p class="${textClass(project.context)}">${escapeHtml(project.context)}</p>
                </article>
                <article>
                  <h4>Objetivo</h4>
                  <p class="${textClass(project.objective)}">${escapeHtml(project.objective)}</p>
                </article>
                <article>
                  <h4>Solução</h4>
                  <p class="${textClass(project.solution)}">${escapeHtml(project.solution)}</p>
                </article>
                <article>
                  <h4>Aprendizados</h4>
                  <p class="${textClass(project.learnings)}">${escapeHtml(project.learnings)}</p>
                </article>
                <article>
                  <h4>Ferramentas</h4>
                  <div class="tools-list">${renderToolsTags(project.tools)}</div>
                </article>
              </div>
              ${renderGallery(project)}
            </div>
          </article>
        `;
      })
      .join("");

    mount.querySelectorAll("[data-toggle-details]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-toggle-details");
        const panel = document.getElementById(id);
        if (!panel) return;

        const open = panel.getAttribute("data-open") === "true";
        panel.setAttribute("data-open", open ? "false" : "true");
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        btn.textContent = open ? "Ver detalhes" : "Ocultar detalhes";
      });
    });
  }

  /* ---------- Ferramentas e processo ---------- */

  function renderToolsProcess() {
    const mount = document.getElementById("tools-process");
    const titleEl = document.getElementById("ferramentas-title");
    if (!mount || !data.toolsProcess) return;

    const tp = data.toolsProcess;
    if (titleEl) titleEl.textContent = tp.title;

    const groups = (tp.groups || [])
      .map(
        (group) => `
        <div class="tool-group reveal">
          <h3>${escapeHtml(group.label)}</h3>
          <div class="tools-list">${renderToolsTags(group.tools)}</div>
        </div>
      `
      )
      .join("");

    const steps = (tp.aiWorkflow?.steps || [])
      .map(
        (step) => `
        <div class="workflow-step">
          <div class="workflow-step__stage">${escapeHtml(step.stage)}</div>
          <p class="${textClass(step.description)}">${escapeHtml(step.description)}</p>
        </div>
      `
      )
      .join("");

    mount.innerHTML = `
      <p class="tools-intro ${textClass(tp.intro)}">${escapeHtml(tp.intro)}</p>
      <div class="tool-groups">${groups}</div>
      <div class="ai-workflow reveal">
        <h3>${escapeHtml(tp.aiWorkflow?.title || "Como utilizo IA")}</h3>
        <div class="workflow-steps">${steps}</div>
      </div>
    `;
  }

  /* ---------- Contato ---------- */

  function renderContact() {
    const mount = document.getElementById("contact-content");
    const titleEl = document.getElementById("contato-title");
    if (!mount || !data.contact) return;

    const c = data.contact;
    if (titleEl) titleEl.textContent = c.title;

    const emailIsPlaceholder = isPlaceholder(c.email);
    const emailHtml = emailIsPlaceholder
      ? `<span class="contact__email contact__email--placeholder">${escapeHtml(c.email)}</span>`
      : `<a class="contact__email" href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>`;

    const links = (c.links || [])
      .map((link) => {
        if (link.enabled && link.url) {
          return `
            <a
              class="contact-link"
              href="${escapeHtml(link.url)}"
              target="_blank"
              rel="noopener noreferrer"
            >${escapeHtml(link.label)}</a>
          `;
        }
        return `
          <span class="contact-link contact-link--disabled">
            ${escapeHtml(link.label)} — [ADICIONE O LINK]
          </span>
        `;
      })
      .join("");

    mount.innerHTML = `
      <p class="contact__intro">${escapeHtml(c.intro)}</p>
      ${emailHtml}
      <div class="contact__links">${links}</div>
    `;
  }

  /* ---------- Navegação mobile ---------- */

  function setupNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("nav-principal");
    if (!toggle || !nav) return;

    const closeNav = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      nav.classList.remove("is-open");
    };

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      toggle.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Reveal on scroll ---------- */

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Init ---------- */

  fillGlobalFields();
  renderHeroVisual();
  renderHeroPanels();
  renderAbout();
  renderProjects();
  setupScreenStacks();
  renderToolsProcess();
  renderContact();
  setupNav();
  setupReveal();
})();
