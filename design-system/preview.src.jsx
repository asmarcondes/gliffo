      const { useState } = React;

      // ── Inlined components (same source as ./components/*, kept import-free for the static preview) ──
      const cx = (...a) => a.filter(Boolean).join(" ");

      const Logo = () => (
        <a href="#" className="gf-logo">
          <span className="gf-logo-text">glif</span>
          <span className="gf-logo-dot">.</span>
          <span className="gf-logo-foo">foo</span>
        </a>
      );

      const Button = ({ variant = "primary", children, ...r }) => {
        const cls = { primary: "gf-btn-primary", share: "gf-btn-share", outline: "gf-btn-outline", auth: "gf-auth-btn" }[variant];
        return <button className={cls} {...r}>{children}</button>;
      };

      const IconButton = ({ accent, dot, children, ...r }) => (
        <button className={cx("gf-iconbtn", accent && "gf-accent")} {...r}>
          {children}{dot && <span className="gf-dot" />}
        </button>
      );

      const Badge = ({ difficulty, variant, children }) =>
        variant === "ea"
          ? <span className="gf-badge-ea">{children}</span>
          : <span className={cx("gf-badge", difficulty)}>{children}</span>;

      const Toggle = ({ checked, onChange }) => (
        <button className={cx("gf-switch", checked && "on")} role="switch" aria-checked={checked} onClick={() => onChange(!checked)}>
          <span className="gf-switch-thumb" />
        </button>
      );

      const Chevron = () => (
        <svg className="gf-cfg-row-chevron" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      );
      const ConfigRow = ({ icon, label, sub, control, chevron }) => {
        const Tag = !control && chevron ? "button" : "div";
        return (
        <Tag className="gf-cfg-row">
          <div className="gf-cfg-row-left">
            <span className="gf-cfg-row-icon">{icon}</span>
            <div><div className="gf-cfg-row-label">{label}</div>{sub && <div className="gf-cfg-row-sub">{sub}</div>}</div>
          </div>
          {control ?? (chevron ? <Chevron /> : null)}
        </Tag>
        );
      };
      const ConfigDivider = () => <div className="gf-cfg-divider" />;

      // A small demo glyph: three overlapping geometric SVG shapes (the game's signature look)
      const DemoGlyph = () => (
        <React.Fragment>
          <svg viewBox="0 0 100 100" style={{ mixBlendMode: "screen" }}><circle cx="42" cy="42" r="30" fill="#f5a623" opacity="0.85" /></svg>
          <svg viewBox="0 0 100 100" style={{ mixBlendMode: "screen" }}><rect x="38" y="38" width="44" height="44" rx="6" fill="#9b8fe8" opacity="0.8" /></svg>
          <svg viewBox="0 0 100 100" style={{ mixBlendMode: "screen" }}><polygon points="50,30 78,74 22,74" fill="#5bbfa0" opacity="0.75" /></svg>
        </React.Fragment>
      );

      const GlyphPanel = ({ tag, daily, children }) => (
        <div className="gf-gpanel-wrap">
          {tag && <div className={cx("gf-gpanel-tag", daily && "daily")}>{tag}</div>}
          <div className="gf-gpanel"><div className="gf-gstage"><div className="gf-glyph-stack">{children}</div></div></div>
        </div>
      );

      const LetterBox = ({ active, decoded, kused, children }) =>
        <div className={cx("gf-lbox", active && "active", decoded && "decoded", kused && "kused")}>{children}</div>;
      const LetterBoxes = ({ children }) => <div className="gf-lboxes">{children}</div>;

      const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
      const Keyboard = ({ keyStates = {} }) => (
        <div className="gf-keyboard">
          {ROWS.map((row, i) => (
            <div className="gf-krow" key={i}>
              {i === 2 && <button className="gf-kbtn wide">ENTER</button>}
              {row.split("").map(ch => <button key={ch} className={cx("gf-kbtn", keyStates[ch])}>{ch}</button>)}
              {i === 2 && <button className="gf-kbtn wide">⌫</button>}
            </div>
          ))}
        </div>
      );

      const Modal = ({ title, sub, children }) => (
        <div className="gf-moverlay"><div className="gf-modal">
          <button className="gf-mclose" aria-label="Fechar">✕</button>
          {title && <div className="gf-modal-title">{title}</div>}
          {sub && <p className="gf-modal-sub">{sub}</p>}
          {children}
        </div></div>
      );

      const StatCard = ({ value, label }) => <div className="gf-stat-card"><div className="gf-stat-val">{value}</div><div className="gf-stat-lbl">{label}</div></div>;
      const StatGrid = ({ stats }) => <div className="gf-stats-grid">{stats.map((s, i) => <StatCard key={i} {...s} />)}</div>;

      const CountdownBlock = ({ label = "Próximo glifo em", time }) => (
        <div className="gf-countdown"><div className="gf-countdown-label">{label}</div><div className="gf-countdown-timer">{time}</div></div>
      );

      const FeedbackMessage = ({ tone, children }) => <div className={cx("gf-fbmsg", tone)}>{children}</div>;

      const AuthCTA = ({ title, note, action = "Criar Conta Gratuita" }) => (
        <div className="gf-auth-cta">
          <div className="gf-auth-cta-icon">👤</div>
          <div className="gf-auth-cta-text"><strong>{title}</strong><br /><span style={{ fontSize: ".85em", opacity: .8 }}>{note}</span></div>
          <Button variant="auth">{action}</Button>
          <button className="gf-auth-dismiss">Agora não</button>
        </div>
      );

      const AchievementPopup = ({ icon = "🏅", name, desc }) => (
        <div className="gf-ach-popup">
          <div className="gf-ach-popup-icon">{icon}</div>
          <div className="gf-ach-popup-text">
            <div className="gf-ach-popup-label">Conquista desbloqueada!</div>
            <div className="gf-ach-popup-name">{name}</div>
            <div className="gf-ach-popup-desc">{desc}</div>
          </div>
        </div>
      );

      const PassportCard = ({ stats }) => (
        <div className="gf-passport">
          <div className="gf-passport-header"><div className="gf-passport-subtitle">glif.foo</div></div>
          <div className="gf-passport-grid">{stats.map((s, i) => <StatCard key={i} {...s} />)}</div>
          <div className="gf-passport-divider" />
          <div className="gf-countdown-label" style={{ textAlign: "center" }}>Distribuição de tentativas</div>
        </div>
      );

      const TutorialPanel = () => (
        <div className="gf-tut-panel">
          <div className="gf-tut-chat-header">
            <div className="gf-tut-agent-avatar">✦</div>
            <span className="gf-tut-agent-name">Gliffo</span>
            <button className="gf-mclose" style={{ position: "static", marginLeft: "auto" }}>✕</button>
          </div>
          <div className="gf-tut-chat-feed">
            <div className="gf-tut-chat-card">Olá! Eu sou o Gliffo. 👋</div>
            <div className="gf-tut-chat-card">As letras se empilham formando um glifo geométrico. Estude as formas e decodifique a palavra.</div>
          </div>
        </div>
      );

      const KeyIcon = () => <svg viewBox="0 0 24 24"><circle cx="8" cy="15" r="4" /><path d="M12 11l8-8M18 6l2 2M15 9l2 2" /></svg>;
      const StatsIcon = () => <svg viewBox="0 0 24 24"><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></svg>;
      const HelpIcon = () => <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2.5-2.5 4" /><circle cx="12" cy="17" r=".5" fill="currentColor" /></svg>;

      function Section({ label, children }) {
        return <div className="pv-section"><div className="pv-label">{label}</div>{children}</div>;
      }

      function Showcase() {
        const [dark, setDark] = useState(true);
        return (
          <div className="gf-scope">
            <Section label="Logo">
              <div className="pv-header-demo"><Logo /></div>
            </Section>

            <Section label="Header / Icon buttons">
              <div className="pv-row">
                <IconButton accent dot title="Chave"><KeyIcon /></IconButton>
                <IconButton title="Estatísticas"><StatsIcon /></IconButton>
                <IconButton title="Ajuda"><HelpIcon /></IconButton>
                <Badge variant="ea">Acesso Antecipado</Badge>
              </div>
            </Section>

            <Section label="Buttons">
              <div className="pv-stack">
                <Button variant="primary">Decodificar</Button>
                <Button variant="share">Compartilhar resultado</Button>
                <Button variant="outline">📸 Compartilhar passaporte</Button>
              </div>
            </Section>

            <Section label="Badges — difficulty">
              <div className="pv-row">
                <Badge difficulty="facil">Fácil</Badge>
                <Badge difficulty="medio">Médio</Badge>
                <Badge difficulty="dificil">Difícil</Badge>
                <Badge difficulty="muito_dificil">Muito Difícil</Badge>
              </div>
            </Section>

            <Section label="Glyph panels">
              <div className="pv-row" style={{ maxWidth: 360 }}>
                <div style={{ width: 150 }}><GlyphPanel tag="Glifo do Dia" daily><DemoGlyph /></GlyphPanel></div>
                <div style={{ width: 150 }}><GlyphPanel tag="Seu Glifo"><DemoGlyph /></GlyphPanel></div>
              </div>
            </Section>

            <Section label="Letter boxes">
              <LetterBoxes>
                <LetterBox>G</LetterBox>
                <LetterBox active>L</LetterBox>
                <LetterBox decoded kused>I</LetterBox>
                <LetterBox>F</LetterBox>
                <LetterBox>O</LetterBox>
              </LetterBoxes>
            </Section>

            <Section label="Feedback messages">
              <div className="pv-stack">
                <FeedbackMessage tone="found">3 letras encontradas na posição certa!</FeedbackMessage>
                <FeedbackMessage tone="err">Palavra não encontrada no dicionário.</FeedbackMessage>
                <FeedbackMessage tone="key">🔑 Letra revelada com a chave.</FeedbackMessage>
                <FeedbackMessage tone="warn">Modo difícil: use as letras descobertas.</FeedbackMessage>
              </div>
            </Section>

            <Section label="Keyboard">
              <Keyboard keyStates={{ A: "correct-key", E: "found-key", Q: "elim", Z: "dimmed" }} />
            </Section>

            <Section label="Toggle / Config rows">
              <div className="pv-stack" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "4px 14px" }}>
                <ConfigRow icon="🌙" label="Tema escuro" sub={dark ? "Ativado" : "Desativado"} control={<Toggle checked={dark} onChange={setDark} />} />
                <ConfigDivider />
                <ConfigRow icon="🔥" label="Modo Difícil" sub="Desativado" control={<Toggle checked={false} onChange={() => {}} />} />
                <ConfigDivider />
                <ConfigRow icon="🎯" label="Modo Prática" sub="Palavra aleatória, sem afetar stats" chevron />
              </div>
            </Section>

            <Section label="Stat grid">
              <div style={{ maxWidth: 360 }}>
                <StatGrid stats={[{ value: "42", label: "Jogos" }, { value: "88%", label: "Vitórias" }, { value: "7", label: "Sequência" }]} />
              </div>
            </Section>

            <Section label="Countdown">
              <CountdownBlock time="08:42:13" />
            </Section>

            <Section label="Achievement popup">
              <AchievementPopup name="Primeiro Glifo" desc="Você decodificou seu primeiro glifo!" />
            </Section>

            <Section label="Auth CTA">
              <div style={{ maxWidth: 360 }}>
                <AuthCTA title="Salvar seu progresso na nuvem?" note="Ao jogar em outro aparelho, seus resultados não serão perdidos." />
              </div>
            </Section>

            <Section label="Passport card">
              <div style={{ maxWidth: 360 }}>
                <PassportCard stats={[{ value: "42", label: "Jogos" }, { value: "37", label: "Vitórias" }, { value: "7", label: "Seq." }, { value: "12", label: "Máx." }]} />
              </div>
            </Section>

            <Section label="Modal">
              <div className="pv-modal-static">
                <Modal title="Decodificado! 🎉" sub="Você acertou em 4 tentativas.">
                  <StatGrid stats={[{ value: "4/6", label: "Tentativas" }, { value: "88%", label: "Vitórias" }, { value: "7", label: "Sequência" }]} />
                  <div className="gf-modal-divider" />
                  <Button variant="share">Compartilhar resultado</Button>
                </Modal>
              </div>
            </Section>

            <Section label="Tutorial panel">
              <div style={{ maxWidth: 360 }}><TutorialPanel /></div>
            </Section>
          </div>
        );
      }

      function App() {
        return (
          <div className="pv-themes">
            <div className="pv-col" data-theme="dark"><h2>Dark</h2><Showcase /></div>
            <div className="pv-col" data-theme="light"><h2>Light</h2><Showcase /></div>
          </div>
        );
      }

      ReactDOM.createRoot(document.getElementById("root")).render(<App />);
