(() => {
  const STORAGE_KEY = 'longcont_idioma';
  const languages = { es: 'Español', en: 'English', zh: '中文' };
  const dictionary = {
    en: {
      'LongCont': 'LongCont', 'Español': 'Spanish', 'English': 'English', '中文': 'Chinese',
      'Buscar': 'Search', 'Iniciar sesión': 'Log in', 'Navegación': 'Navigation', 'IDIOMA': 'Language',
      'Novedades': 'News', 'Recientes': 'Recent', 'Antiguas': 'Earlier', 'Información': 'Information',
      'Inicio': 'Home', 'Historia y cultura': 'History and culture',
      'Economía, gastronomía y turismo': 'Economy, cuisine and tourism', 'Celebridades, programas y cine': 'Celebrities, shows and film',
      'China Tradicional': 'Traditional China', 'China Moderna': 'Modern China', 'Culturas Populares': 'Popular Culture',
      'Participación': 'Get involved', 'Voluntariado': 'Volunteering', 'Cómo participar': 'How to participate',
      'Sobre nosotros': 'About us', 'Quiénes somos': 'Who we are', 'Origen de la ONG': 'Our NGO origins',
      'Nuestros Departamentos': 'Our departments', 'Búsqueda': 'Search', 'Sugerencias': 'Suggestions',
      'Ver Novedades': 'View news', 'Explorar Información': 'Explore information', 'Sumate a Participación': 'Get involved',
      'Gastronomía China': 'Chinese cuisine', 'Presiona Enter para buscar': 'Press Enter to search',
      'LongCont — Conecta con la esencia de China': 'LongCont — Connect with the essence of China',
      'Explorar Cultura': 'Explore culture', 'Ver próximos eventos': 'View upcoming events',
      'Novedades, eventos y comunidad': 'News, events and community', 'Novedades recientes': 'Recent news',
      'Información': 'Information', 'Raíces y tradiciones': 'Roots and traditions', 'Historia': 'History', 'Cultura': 'Culture',
      'Festivales': 'Festivals', 'Economía': 'Economy', 'Gastronomía': 'Cuisine', 'Turismo': 'Tourism',
      'Celebridades': 'Celebrities', 'Programas': 'Shows', 'Cine y TV': 'Film and TV', 'Ver más': 'Read more',
      'Sobre Nosotros': 'About us', 'Eventos al año': 'Events per year', 'Participantes': 'Participants',
      'Programas': 'Programs', 'Explorá': 'Explore', 'Participá': 'Take part', 'Contacto': 'Contact',
      'Todos los derechos reservados.': 'All rights reserved.', 'Crear Cuenta': 'Create account',
      'Nombre completo': 'Full name', 'Nombre de usuario': 'Username', 'Correo electrónico': 'Email address',
      'Contraseña': 'Password', 'Confirmar contraseña': 'Confirm password', 'Registrarse': 'Sign up',
      '¿Ya tenés cuenta? ': 'Already have an account? ', 'Iniciá sesión aquí': 'Log in here',
      'Iniciar Sesión': 'Log in', 'Correo electrónico o nombre de usuario': 'Email address or username',
      'Recordarme': 'Remember me', '¿Olvidaste tu contraseña?': 'Forgot your password?',
      '¿No tenés cuenta? ': "Don't have an account? ", 'Registrate aquí': 'Sign up here',
      'Panel de Control': 'Control panel', 'Cerrar sesión': 'Log out', 'Publicaciones': 'Posts',
      'Mi Perfil': 'My profile', 'Calendario': 'Calendar', 'Ajustes': 'Settings', 'Chat': 'Chat',
      'Accesos Directos': 'Quick access', 'Mis publicaciones': 'My posts', 'Eliminar las mías': 'Delete mine',
      'Título': 'Title', 'Categoría': 'Category', 'Imagen (opcional)': 'Image (optional)',
      'Descripción breve': 'Short description', 'Crear publicación ': 'Create post ',
      'Explora las secciones principales de LongCont. Cada categoría es clickeable y cuenta con un estado de hover visual.': 'Explore LongCont’s main sections. Each category is clickable and has a visual hover state.',
      'Jardín tradicional chino con pabellones y lago': 'Traditional Chinese garden with pavilions and a lake',
      'Explora cultura china en LongCont': 'Explore Chinese culture at LongCont',
      'Buscar en LongCont...': 'Search LongCont...',
      'Actualidad de China, organizada por tema para encontrar cada noticia con facilidad.': 'Current affairs from China, organized by topic so you can easily find each story.',
      'La inteligencia artificial, eje de la Expo Digital Global': 'Artificial intelligence takes centre stage at the Global Digital Expo',
      'La innovación digital y la IA ocupan un lugar central en la agenda tecnológica china de septiembre.': 'Digital innovation and AI hold a central place on China’s September technology agenda.',
      'El comercio exterior de China mantiene un fuerte crecimiento': 'China’s foreign trade maintains strong growth',
      'Nuevo impulso a los materiales educativos de calidad': 'New momentum for high-quality educational materials',
      'Ampliación de la cobertura médica para trabajadores flexibles': 'Expanded health coverage for flexible workers',
      'Explorá China tradicional, moderna y sus expresiones culturales populares.': 'Explore traditional and modern China, as well as its popular cultural expressions.',
      'Únete a la comunidad. Hay muchas formas de contribuir y crecer.': 'Join the community. There are many ways to contribute and grow.',
      'Ayuda en eventos, talleres y actividades culturales. Contribuye con tu tiempo y conoce gente increíble en el camino.': 'Help with events, workshops, and cultural activities. Give your time and meet amazing people along the way.',
      'Elegí la propuesta que más te interese: asistí a actividades, compartí contenidos o sumate como voluntario a nuestros equipos.': 'Choose the option that interests you most: attend activities, share content, or join our teams as a volunteer.',
      'Conocé las opciones →': 'Explore the options →',
      'NUESTRA HISTORIA': 'OUR STORY', 'NUESTRO EQUIPO': 'OUR TEAM',
      'Difusión de cultura china para jóvenes y público general.': 'Sharing Chinese culture with young people and the general public.',
      'Diseñado y desarrollado con ❤️': 'Designed and developed with ❤️'
    },
    zh: {
      'LongCont': '珑骢', 'Español': '西班牙语', 'English': '英语', '中文': '中文',
      'Buscar': '搜索', 'Iniciar sesión': '登录', 'Navegación': '导航', 'IDIOMA': '语言',
      'Novedades': '最新动态', 'Recientes': '最新', 'Antiguas': '往期', 'Información': '信息',
      'Inicio': '首页', 'Historia y cultura': '历史与文化',
      'Economía, gastronomía y turismo': '经济、美食与旅游', 'Celebridades, programas y cine': '明星、节目与电影',
      'China Tradicional': '传统中国', 'China Moderna': '现代中国', 'Culturas Populares': '流行文化',
      'Participación': '参与', 'Voluntariado': '志愿服务', 'Cómo participar': '如何参与',
      'Sobre nosotros': '关于我们', 'Quiénes somos': '我们是谁', 'Origen de la ONG': '组织起源',
      'Nuestros Departamentos': '我们的部门', 'Búsqueda': '搜索', 'Sugerencias': '建议',
      'Ver Novedades': '查看动态', 'Explorar Información': '探索信息', 'Sumate a Participación': '参与我们',
      'Gastronomía China': '中国美食', 'Presiona Enter para buscar': '按 Enter 键搜索',
      'LongCont — Conecta con la esencia de China': '珑骢 — 连接中国的精髓',
      'Explorar Cultura': '探索文化', 'Ver próximos eventos': '查看近期活动', 'Novedades, eventos y comunidad': '新闻、活动与社区',
      'Novedades recientes': '最新动态', 'Raíces y tradiciones': '根源与传统', 'Historia': '历史', 'Cultura': '文化',
      'Festivales': '节日', 'Economía': '经济', 'Gastronomía': '美食', 'Turismo': '旅游',
      'Celebridades': '明星', 'Programas': '节目', 'Cine y TV': '电影和电视', 'Ver más': '查看更多',
      'Sobre Nosotros': '关于我们', 'Eventos al año': '年度活动', 'Participantes': '参与者',
      'Explorá': '探索', 'Participá': '参与', 'Contacto': '联系我们', 'Todos los derechos reservados.': '版权所有。',
      'Crear Cuenta': '创建账户', 'Nombre completo': '姓名', 'Nombre de usuario': '用户名', 'Correo electrónico': '电子邮箱',
      'Contraseña': '密码', 'Confirmar contraseña': '确认密码', 'Registrarse': '注册',
      '¿Ya tenés cuenta? ': '已有账户？', 'Iniciá sesión aquí': '在此登录', 'Iniciar Sesión': '登录',
      'Correo electrónico o nombre de usuario': '电子邮箱或用户名', 'Recordarme': '记住我',
      '¿Olvidaste tu contraseña?': '忘记密码？', '¿No tenés cuenta? ': '还没有账户？', 'Registrate aquí': '在此注册',
      'Panel de Control': '控制面板', 'Cerrar sesión': '退出登录', 'Publicaciones': '发布内容',
      'Mi Perfil': '我的资料', 'Calendario': '日历', 'Ajustes': '设置', 'Accesos Directos': '快捷入口',
      'Mis publicaciones': '我的发布', 'Eliminar las mías': '删除我的内容', 'Título': '标题', 'Categoría': '分类',
      'Imagen (opcional)': '图片（可选）', 'Descripción breve': '简短描述', 'Crear publicación ': '创建发布 '
      , 'Explora las secciones principales de LongCont. Cada categoría es clickeable y cuenta con un estado de hover visual.': '探索 LongCont 的主要栏目。每个类别均可点击，并提供悬停视觉效果。'
      , 'Jardín tradicional chino con pabellones y lago': '拥有亭台与湖泊的中国传统园林'
      , 'Explora cultura china en LongCont': '在 LongCont 探索中国文化'
      , 'Buscar en LongCont...': '在 LongCont 中搜索…'
      , 'Actualidad de China, organizada por tema para encontrar cada noticia con facilidad.': '按主题整理的中国时事资讯，帮助您轻松找到每一条新闻。'
      , 'La inteligencia artificial, eje de la Expo Digital Global': '人工智能成为全球数字博览会的核心'
      , 'La innovación digital y la IA ocupan un lugar central en la agenda tecnológica china de septiembre.': '数字创新和人工智能在中国九月科技议程中占据核心位置。'
      , 'El comercio exterior de China mantiene un fuerte crecimiento': '中国对外贸易保持强劲增长'
      , 'El intercambio de bienes creció 17,6 % interanual durante los primeros ocho meses de 2026, según datos oficiales.': '官方数据显示，2026 年前八个月货物贸易同比增长 17.6%。'
      , 'Nuevo impulso a los materiales educativos de calidad': '优质教育材料获得新推动力'
      , 'Con el inicio del semestre, China refuerza el desarrollo y la gestión de libros de texto en su sistema educativo.': '随着学期开始，中国加强了教育体系中教材的开发与管理。'
      , 'Ampliación de la cobertura médica para trabajadores flexibles': '扩大灵活就业人员的医疗保障'
      , 'El país busca extender el seguro médico a trabajadores temporales, migrantes y de nuevas modalidades laborales.': '中国正寻求将医疗保险覆盖至临时工、流动人员和新就业形态劳动者。'
      , 'Explorá China tradicional, moderna y sus expresiones culturales populares.': '探索传统中国、现代中国及其流行文化表达。'
      , 'Conocé los períodos, dinastías, inventos y legados que formaron una de las civilizaciones más antiguas del mundo.': '了解塑造了世界最古老文明之一的时代、朝代、发明与遗产。'
      , 'Descubrí arte, caligrafía, gastronomía, festivales y tradiciones que siguen dando vida a la identidad china.': '发现艺术、书法、美食、节日和至今仍赋予中国文化生命力的传统。'
      , 'Conocé las celebraciones que reúnen a familias y comunidades a lo largo del calendario tradicional chino.': '了解贯穿中国传统历法、凝聚家庭与社区的庆典。'
      , 'Conocé las transformaciones económicas, la innovación y los vínculos comerciales que conectan a China con el mundo.': '了解连接中国与世界的经济变革、创新与贸易联系。'
      , 'Descubrí sabores, ingredientes y técnicas que hacen de la cocina china una tradición viva y diversa.': '发现使中国烹饪成为鲜活而多元传统的风味、食材与技法。'
      , 'Recorré paisajes, ciudades y patrimonios que muestran la diversidad geográfica y cultural de China.': '游览展现中国地理与文化多样性的风景、城市和遗产。'
      , 'Conocé artistas, deportistas y figuras públicas que marcan tendencias dentro y fuera de China.': '认识引领中国国内外潮流的艺术家、运动员和公众人物。'
      , 'Explorá concursos, realities y formatos de entretenimiento que conectan a millones de espectadores.': '探索连接数百万观众的竞赛、真人秀和娱乐节目。'
      , 'Descubrí historias, géneros y producciones que llevan relatos chinos a pantallas de todo el mundo.': '发现将中国故事带向世界各地屏幕的故事、类型和作品。'
      , 'Únete a la comunidad. Hay muchas formas de contribuir y crecer.': '加入社区。这里有许多贡献并共同成长的方式。'
      , 'Ayuda en eventos, talleres y actividades culturales. Contribuye con tu tiempo y conoce gente increíble en el camino.': '协助活动、工作坊和文化项目。贡献您的时间，并结识优秀的人。'
      , 'Elegí la propuesta que más te interese: asistí a actividades, compartí contenidos o sumate como voluntario a nuestros equipos.': '选择您最感兴趣的方式：参加活动、分享内容，或作为志愿者加入我们的团队。'
      , 'Conocé las opciones →': '了解参与方式 →'
      , 'LongCont nace con el objetivo de acercar la cultura china a jóvenes y público general. Creemos que la conexión cultural es el puente que nos permite explorar la riqueza de una nación milenaria sin salir de Argentina.': 'LongCont 致力于让青年和公众更贴近中国文化。我们相信，文化连接是一座桥梁，让我们即使身在阿根廷，也能探索这个千年文明的丰富内涵。'
      , 'Organizamos talleres, eventos y contenidos educativos para que puedas descubrir lo mejor de China: su historia, arte, tradiciones y futuro.': '我们组织工作坊、活动和教育内容，让您发现中国最精彩的一面：历史、艺术、传统与未来。'
      , 'NUESTRA HISTORIA': '我们的故事', 'NUESTRO EQUIPO': '我们的团队'
      , 'LongCont nació del deseo de crear un punto de encuentro entre jóvenes y la riqueza de la cultura china. Desde ese primer impulso, construimos actividades, contenidos y vínculos que invitan a aprender, compartir y crecer en comunidad.': 'LongCont 源于在青年与丰富中国文化之间建立交流平台的愿望。从最初的动力出发，我们不断打造活动、内容与联系，邀请大家在社区中学习、分享和成长。'
      , 'Conocé los departamentos': '了解各部门'
      , 'Conocé las áreas que hacen posible LongCont: contenidos, eventos, comunicación y comunidad. Cada equipo aporta ideas y trabajo para acercar la cultura china a más personas.': '了解使 LongCont 成为可能的团队：内容、活动、传播与社区。每个团队都贡献想法和努力，让更多人接近中国文化。'
      , 'Difusión de cultura china para jóvenes y público general.': '面向青年与公众传播中国文化。'
      , 'Diseñado y desarrollado con ❤️': '用 ❤️ 设计与开发'
    }
  };
  const originals = new WeakMap();
  let translationRun = 0;

  const languageStyles = document.createElement('style');
  languageStyles.textContent = '.idioma-flotante{position:fixed;right:1rem;bottom:1rem;z-index:1000;display:flex;overflow:hidden;border:1px solid #d7c49a;border-radius:999px;background:#fff;box-shadow:0 4px 18px #0002}.idioma-flotante button{border:0;background:transparent;padding:.45rem .65rem;color:#3a3024;font:600 .75rem/1 system-ui,sans-serif;cursor:pointer}.idioma-flotante button.activo{background:#9c2020;color:#fff}.idioma-flotante button:focus-visible{outline:2px solid #171717;outline-offset:-2px}';
  document.head.append(languageStyles);

  function translatableTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (node.parentElement?.closest('script, style, .selector-idioma, .idioma-flotante')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }

  function translateTextNodes(language) {
    const nodes = translatableTextNodes();
    nodes.forEach((node) => {
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const source = originals.get(node);
      const text = source.trim();
      const replacement = dictionary[language]?.[text];
      if (!replacement) { node.nodeValue = source; return; }
      node.nodeValue = source.replace(text, replacement);
    });
    return nodes;
  }

  function getCache(language) {
    try { return JSON.parse(localStorage.getItem(`longcont_traducciones_${language}`) || '{}'); } catch { return {}; }
  }

  function saveCache(language, cache) {
    try { localStorage.setItem(`longcont_traducciones_${language}`, JSON.stringify(cache)); } catch { /* La traducción sigue funcionando aunque no pueda almacenarse. */ }
  }

  async function translateWithService(text, language) {
    const target = language === 'zh' ? 'zh-CN' : language;
    const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Translation service unavailable');
    const data = await response.json();
    return data[0].map((part) => part[0]).join('');
  }

  async function translateRemainingContent(nodes, language, run) {
    if (language === 'es') return;
    const cache = getCache(language);
    const pending = new Map();
    nodes.forEach((node) => {
      const source = originals.get(node)?.trim();
      if (!source || dictionary[language]?.[source]) return;
      if (cache[source]) {
        if (run === translationRun) node.nodeValue = originals.get(node).replace(source, cache[source]);
      } else if (/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(source)) {
        if (!pending.has(source)) pending.set(source, []);
        pending.get(source).push(node);
      }
    });

    const entries = [...pending.entries()];
    const worker = async () => {
      while (entries.length && run === translationRun) {
        const [source, textNodes] = entries.shift();
        try {
          const translated = await translateWithService(source, language);
          cache[source] = translated;
          textNodes.forEach((node) => {
            if (run === translationRun) node.nodeValue = originals.get(node).replace(source, translated);
          });
        } catch { /* Conserva el texto original si no hay conexión. */ }
      }
    };
    await Promise.all(Array.from({ length: 4 }, worker));
    if (run === translationRun) saveCache(language, cache);
  }

  function buildSwitchers(language) {
    document.querySelectorAll('.selector-idioma').forEach((selector) => {
      selector.querySelectorAll('button').forEach((button) => {
        const code = button.dataset.language || (button.textContent.includes('中文') ? 'zh' : button.textContent.includes('English') ? 'en' : 'es');
        button.dataset.language = code;
        button.classList.toggle('idioma-activo', code === language);
        button.onclick = () => setLanguage(code);
      });
    });
    if (document.querySelector('.selector-idioma') || document.querySelector('.idioma-flotante')) return;
    const switcher = document.createElement('div');
    switcher.className = 'idioma-flotante';
    switcher.setAttribute('aria-label', 'Language selector');
    switcher.innerHTML = '<button type="button" data-language="es">ES</button><button type="button" data-language="en">EN</button><button type="button" data-language="zh">中文</button>';
    switcher.querySelectorAll('button').forEach((button) => {
      button.classList.toggle('activo', button.dataset.language === language);
      button.addEventListener('click', () => setLanguage(button.dataset.language));
    });
    document.body.append(switcher);
  }

  function setLanguage(language) {
    const selected = languages[language] ? language : 'es';
    localStorage.setItem(STORAGE_KEY, selected);
    document.documentElement.lang = selected === 'zh' ? 'zh-CN' : selected;
    const run = ++translationRun;
    const nodes = translateTextNodes(selected);
    const languageLabels = { es: 'IDIOMA', en: 'Language', zh: '语言' };
    document.querySelectorAll('.selector-idioma > span:first-child').forEach((label) => {
      label.textContent = languageLabels[selected];
    });
    buildSwitchers(selected);
    translateRemainingContent(nodes, selected, run);
    document.dispatchEvent(new CustomEvent('longcont:languagechange', { detail: { language: selected } }));
  }

  function init() { setLanguage(localStorage.getItem(STORAGE_KEY) || 'es'); }
  window.LongContI18n = { setLanguage, getLanguage: () => localStorage.getItem(STORAGE_KEY) || 'es' };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
