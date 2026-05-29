import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { defaultContent, mergeContent } from "../content/ContentContext";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [doc, setDoc] = useState(null);
  const [projectsText, setProjectsText] = useState("");
  const [expText, setExpText] = useState("");
  const [eduText, setEduText] = useState("");
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const setPersonal = (patch) => setDoc((d) => ({ ...d, personal: { ...d.personal, ...patch } }));

  const login = async (e) => {
    e?.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const r = await fetch("/api/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) {
        setStatus({ type: "error", msg: "Wrong password." });
        setBusy(false);
        return;
      }
      const saved = await fetch("/api/content").then((x) => (x.ok ? x.json() : {})).catch(() => ({}));
      const merged = mergeContent(saved);
      setDoc(merged);
      setProjectsText(JSON.stringify(merged.projects, null, 2));
      setExpText(JSON.stringify(merged.experiences, null, 2));
      setEduText(JSON.stringify(merged.education, null, 2));
      setAuthed(true);
    } catch (err) {
      setStatus({ type: "error", msg: "Could not reach the server. Is the API deployed?" });
    }
    setBusy(false);
  };

  const save = async () => {
    let projects;
    let experiences;
    let education;
    try {
      projects = JSON.parse(projectsText);
      experiences = JSON.parse(expText);
      education = JSON.parse(eduText);
    } catch (err) {
      setStatus({ type: "error", msg: "JSON error — fix it before saving: " + err.message });
      return;
    }
    const data = { personal: doc.personal, projects, experiences, education };
    setBusy(true);
    setStatus(null);
    try {
      const r = await fetch("/api/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password, data }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok) setStatus({ type: "success", msg: "Saved. Your live site is updated." });
      else setStatus({ type: "error", msg: j.error || "Save failed." });
    } catch (err) {
      setStatus({ type: "error", msg: "Network error while saving." });
    }
    setBusy(false);
  };

  const resetDefaults = () => {
    const merged = mergeContent(defaultContent);
    setDoc(merged);
    setProjectsText(JSON.stringify(defaultContent.projects, null, 2));
    setExpText(JSON.stringify(defaultContent.experiences, null, 2));
    setEduText(JSON.stringify(defaultContent.education, null, 2));
    setStatus({ type: "info", msg: "Reset to defaults (not saved yet)." });
  };

  /* ---------- login screen ---------- */
  if (!authed) {
    return (
      <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 3 }}>
        <Box component="form" onSubmit={login} sx={{ width: "100%", maxWidth: 360 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>Portfolio admin</Typography>
          <Typography variant="h4" sx={{ mb: 1, fontSize: "1.8rem" }}>Sign in</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            Enter the admin password to edit your live portfolio.
          </Typography>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoFocus
            size="small"
            sx={{ mb: 2 }}
          />
          {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.msg}</Alert>}
          <Button type="submit" variant="contained" fullWidth disabled={busy || !password}>
            {busy ? "Checking…" : "Enter"}
          </Button>
          <Button href="/" sx={{ mt: 1.5, color: "text.secondary" }} fullWidth>Back to site</Button>
        </Box>
      </Box>
    );
  }

  const p = doc.personal;

  /* ---------- editor ---------- */
  return (
    <Box sx={{ minHeight: "100dvh", pb: 10 }}>
      {/* sticky action bar */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 10, bgcolor: "background.default", borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="md">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 60, gap: 2 }}>
            <Typography sx={{ fontWeight: 600 }}>Editing portfolio</Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Button size="small" href="/" target="_blank" endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />} sx={{ color: "text.secondary" }}>
                View site
              </Button>
              <Button size="small" onClick={resetDefaults} sx={{ color: "text.secondary" }}>Reset</Button>
              <Button size="small" variant="contained" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save changes"}</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: 4 }}>
        {status && <Alert severity={status.type} sx={{ mb: 3 }}>{status.msg}</Alert>}

        {/* About */}
        <Section title="About">
          <Field label="Greeting" value={p.greeting} onChange={(v) => setPersonal({ greeting: v })} />
          <Field label="Title" value={p.title} onChange={(v) => setPersonal({ title: v })} />
          <Field label="Intro" value={p.intro} onChange={(v) => setPersonal({ intro: v })} multiline />
          <Field label="Intro note" value={p.introNote} onChange={(v) => setPersonal({ introNote: v })} multiline />
          <Field label="Birth date (YYYY-MM-DD) — drives the live age" value={p.birthDate} onChange={(v) => setPersonal({ birthDate: v })} />
          <Field label="Résumé link (URL to your PDF — host on Drive/Dropbox, or drop the file in /public)" value={p.resumeUrl} onChange={(v) => setPersonal({ resumeUrl: v })} />
          <Field label="Tools (comma separated)" value={(p.tools || []).join(", ")} onChange={(v) => setPersonal({ tools: v.split(",").map((s) => s.trim()).filter(Boolean) })} multiline />
        </Section>

        {/* About blocks */}
        <Section title="About — labeled blocks">
          {(p.about || []).map((row, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
              <TextField size="small" label="Label" value={row.label} sx={{ width: 160 }} onChange={(e) => {
                const about = [...p.about]; about[i] = { ...about[i], label: e.target.value }; setPersonal({ about });
              }} />
              <TextField size="small" label="Value" value={row.value} fullWidth multiline onChange={(e) => {
                const about = [...p.about]; about[i] = { ...about[i], value: e.target.value }; setPersonal({ about });
              }} />
              <IconButton aria-label="Remove" onClick={() => setPersonal({ about: p.about.filter((_, k) => k !== i) })} sx={{ mt: 0.5 }}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Stack>
          ))}
          <Button startIcon={<AddRoundedIcon />} size="small" onClick={() => setPersonal({ about: [...(p.about || []), { label: "", value: "" }] })}>
            Add block
          </Button>
        </Section>

        {/* Projects */}
        <Section title="Projects (JSON)" hint="Array of projects. Set featured:true for Professional Work; false for Side Projects. Fields: title, kind, year, description, image, tags[], link, github, featured.">
          <JsonArea value={projectsText} onChange={setProjectsText} />
        </Section>

        {/* Career */}
        <Section title="Career — experience (JSON)" hint="Fields: company, role, period, location, summary, highlights[], tech[], metric{value,suffix,label}, links[{label,url}].">
          <JsonArea value={expText} onChange={setExpText} />
        </Section>
        <Section title="Career — education (JSON)" hint="Fields: degree, school, period, score.">
          <JsonArea value={eduText} onChange={setEduText} />
        </Section>

        <Button variant="contained" onClick={save} disabled={busy} sx={{ mt: 1 }}>{busy ? "Saving…" : "Save changes"}</Button>
      </Container>
    </Box>
  );
}

function Section({ title, hint, children }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ mb: hint ? 0.5 : 2 }}>{title}</Typography>
      {hint && <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>{hint}</Typography>}
      <Divider sx={{ mb: 2.5 }} />
      {children}
    </Box>
  );
}

function Field({ label, value, onChange, multiline }) {
  return (
    <TextField label={label} value={value || ""} onChange={(e) => onChange(e.target.value)} fullWidth size="small" multiline={multiline} minRows={multiline ? 2 : 1} sx={{ mb: 2 }} />
  );
}

function JsonArea({ value, onChange }) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      multiline
      minRows={8}
      InputProps={{ sx: { fontFamily: '"Fira Code", monospace', fontSize: "0.8rem" } }}
    />
  );
}
