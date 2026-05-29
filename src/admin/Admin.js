import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { defaultContent, mergeContent } from "../content/ContentContext";

/* ---------- small reusable inputs ---------- */
function F({ label, value, onChange, multiline, minRows, hint, sx }) {
  return (
    <TextField
      label={label}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
      multiline={multiline}
      minRows={minRows || (multiline ? 2 : 1)}
      helperText={hint}
      sx={{ mb: 2, ...sx }}
    />
  );
}

function CsvField({ label, value = [], onChange, hint }) {
  return <F label={label} value={value.join(", ")} hint={hint} onChange={(v) => onChange(v.split(",").map((s) => s.trim()).filter(Boolean))} />;
}

function LinesField({ label, value = [], onChange, hint }) {
  return <F label={label} value={value.join("\n")} multiline minRows={3} hint={hint} onChange={(v) => onChange(v.split("\n").map((s) => s.trim()).filter(Boolean))} />;
}

function LinksEditor({ links = [], onChange }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 1 }}>Links</Typography>
      {links.map((l, i) => (
        <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 1 }}>
          <TextField size="small" label="Label" value={l.label || ""} sx={{ flex: 1 }} onChange={(e) => onChange(links.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))} />
          <TextField size="small" label="URL" value={l.url || ""} sx={{ flex: 2 }} onChange={(e) => onChange(links.map((x, k) => (k === i ? { ...x, url: e.target.value } : x)))} />
          <IconButton aria-label="Remove link" onClick={() => onChange(links.filter((_, k) => k !== i))}><DeleteOutlineRoundedIcon /></IconButton>
        </Stack>
      ))}
      <Button startIcon={<AddRoundedIcon />} size="small" onClick={() => onChange([...links, { label: "", url: "" }])}>Add link</Button>
    </Box>
  );
}

function ItemCard({ title, subtitle, badge, onDelete, onUp, onDown, children }) {
  return (
    <Accordion disableGutters sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, mb: 1.5, bgcolor: "background.paper", "&:before": { display: "none" }, overflow: "hidden" }}>
      <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1, minWidth: 0, pr: 1 }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography sx={{ fontWeight: 600 }} noWrap>{title || "Untitled"}</Typography>
            {subtitle && <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>{subtitle}</Typography>}
          </Box>
          {badge && <Chip label={badge} size="small" color="success" variant="outlined" />}
          <Box onClick={(e) => e.stopPropagation()} sx={{ display: "flex" }}>
            <IconButton size="small" aria-label="Move up" onClick={onUp}><ArrowUpwardRoundedIcon fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="Move down" onClick={onDown}><ArrowDownwardRoundedIcon fontSize="small" /></IconButton>
            <IconButton size="small" aria-label="Delete" onClick={onDelete}><DeleteOutlineRoundedIcon fontSize="small" /></IconButton>
          </Box>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: "1px solid", borderColor: "divider", pt: 2.5 }}>{children}</AccordionDetails>
    </Accordion>
  );
}

/* ---------- admin ---------- */
export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [doc, setDoc] = useState(null);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState(0);

  const setPersonal = (patch) => setDoc((d) => ({ ...d, personal: { ...d.personal, ...patch } }));
  const updateItem = (key, i, patch) => setDoc((d) => ({ ...d, [key]: d[key].map((it, k) => (k === i ? { ...it, ...patch } : it)) }));
  const addItem = (key, item) => setDoc((d) => ({ ...d, [key]: [...d[key], item] }));
  const removeItem = (key, i) => setDoc((d) => ({ ...d, [key]: d[key].filter((_, k) => k !== i) }));
  const move = (key, i, dir) => setDoc((d) => {
    const arr = [...d[key]];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return d;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return { ...d, [key]: arr };
  });

  const login = async (e) => {
    e?.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const r = await fetch("/api/auth", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
      if (!r.ok) { setStatus({ type: "error", msg: "Wrong password." }); setBusy(false); return; }
      const saved = await fetch("/api/content").then((x) => (x.ok ? x.json() : {})).catch(() => ({}));
      setDoc(mergeContent(saved));
      setAuthed(true);
    } catch (err) {
      setStatus({ type: "error", msg: "Couldn't reach the server. Run `vercel dev` or deploy to use the admin." });
    }
    setBusy(false);
  };

  const save = async () => {
    setBusy(true);
    setStatus(null);
    try {
      const data = { personal: doc.personal, projects: doc.projects, experiences: doc.experiences, education: doc.education };
      const r = await fetch("/api/content", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password, data }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok) setStatus({ type: "success", msg: "Saved — your live site is updated." });
      else setStatus({ type: "error", msg: j.error || "Save failed." });
    } catch (err) {
      setStatus({ type: "error", msg: "Network error while saving." });
    }
    setBusy(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetDefaults = () => {
    setDoc(mergeContent(defaultContent));
    setStatus({ type: "info", msg: "Reverted to defaults (not saved yet — press Save to apply)." });
  };

  /* ---------- login ---------- */
  if (!authed) {
    return (
      <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", p: 3 }}>
        <Box component="form" onSubmit={login} sx={{ width: "100%", maxWidth: 360 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>Portfolio admin</Typography>
          <Typography variant="h4" sx={{ mb: 1, fontSize: "1.8rem" }}>Sign in</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>Enter the admin password to edit your live portfolio.</Typography>
          <TextField type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth autoFocus size="small" sx={{ mb: 2 }} />
          {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.msg}</Alert>}
          <Button type="submit" variant="contained" fullWidth disabled={busy || !password}>{busy ? "Checking…" : "Enter"}</Button>
          <Button href="/" sx={{ mt: 1.5, color: "text.secondary" }} fullWidth>Back to site</Button>
        </Box>
      </Box>
    );
  }

  const p = doc.personal;

  /* ---------- editor ---------- */
  return (
    <Box sx={{ minHeight: "100dvh", pb: 12 }}>
      {/* sticky header */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 10, bgcolor: "custom.headerBg", backdropFilter: "blur(8px)", borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="md">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ minHeight: 60, gap: 1, flexWrap: "wrap", py: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Editing portfolio</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button size="small" href="/" target="_blank" endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />} sx={{ color: "text.secondary" }}>View site</Button>
              <Button size="small" onClick={resetDefaults} sx={{ color: "text.secondary" }}>Reset</Button>
              <Button size="small" onClick={() => { setAuthed(false); setPassword(""); }} startIcon={<LogoutRoundedIcon sx={{ fontSize: 16 }} />} sx={{ color: "text.secondary" }}>Sign out</Button>
              <Button size="small" variant="contained" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save changes"}</Button>
            </Stack>
          </Stack>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ minHeight: 40, "& .MuiTab-root": { minHeight: 40, textTransform: "none" } }}>
            <Tab label="About" />
            <Tab label={`Work (${doc.projects.length})`} />
            <Tab label={`Career (${doc.experiences.length})`} />
            <Tab label={`Education (${doc.education.length})`} />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: 3 }}>
        {status && <Alert severity={status.type} sx={{ mb: 3 }} onClose={() => setStatus(null)}>{status.msg}</Alert>}

        {/* ABOUT */}
        {tab === 0 && (
          <Box>
            <F label="Greeting" value={p.greeting} onChange={(v) => setPersonal({ greeting: v })} />
            <F label="Title" value={p.title} onChange={(v) => setPersonal({ title: v })} />
            <F label="Intro" value={p.intro} onChange={(v) => setPersonal({ intro: v })} multiline />
            <F label="Intro note" value={p.introNote} onChange={(v) => setPersonal({ introNote: v })} multiline />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <F label="Location" value={p.location} onChange={(v) => setPersonal({ location: v })} />
              <F label="Email" value={p.email} onChange={(v) => setPersonal({ email: v })} />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <F label="Birth date (YYYY-MM-DD)" hint="Drives the live age" value={p.birthDate} onChange={(v) => setPersonal({ birthDate: v })} />
              <F label="Avatar path" hint="e.g. /avatar.jpeg" value={p.avatar} onChange={(v) => setPersonal({ avatar: v })} />
            </Stack>
            <F label="Résumé link" hint="A URL to your PDF, or /Md_Wasim_Aslam.pdf in the public folder" value={p.resumeUrl} onChange={(v) => setPersonal({ resumeUrl: v })} />
            <CsvField label="Stack / tools" hint="Comma separated — shown as chips" value={p.tools} onChange={(v) => setPersonal({ tools: v })} />

            <Divider sx={{ my: 3 }} />
            <Typography variant="overline" sx={{ color: "text.secondary" }}>Labeled blocks (Role, Experience, Location…)</Typography>
            <Box sx={{ mt: 1.5 }}>
              {(p.about || []).map((row, i) => (
                <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="flex-start" sx={{ mb: 1.5 }}>
                  <TextField size="small" label="Label" value={row.label} sx={{ width: { sm: 150 } }} onChange={(e) => setPersonal({ about: p.about.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)) })} />
                  <TextField size="small" label="Value" value={row.value} fullWidth multiline onChange={(e) => setPersonal({ about: p.about.map((x, k) => (k === i ? { ...x, value: e.target.value } : x)) })} />
                  <IconButton aria-label="Remove" onClick={() => setPersonal({ about: p.about.filter((_, k) => k !== i) })}><DeleteOutlineRoundedIcon /></IconButton>
                </Stack>
              ))}
              <Button startIcon={<AddRoundedIcon />} size="small" onClick={() => setPersonal({ about: [...(p.about || []), { label: "", value: "" }] })}>Add block</Button>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="overline" sx={{ color: "text.secondary" }}>Contact handles ("Find me")</Typography>
            <Box sx={{ mt: 1.5 }}>
              {(p.contacts || []).map((c, i) => (
                <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 1.5 }}>
                  <TextField size="small" label="Label" value={c.label} sx={{ width: { sm: 120 } }} onChange={(e) => setPersonal({ contacts: p.contacts.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)) })} />
                  <TextField size="small" label="Handle" value={c.handle} sx={{ flex: 1 }} onChange={(e) => setPersonal({ contacts: p.contacts.map((x, k) => (k === i ? { ...x, handle: e.target.value } : x)) })} />
                  <TextField size="small" label="URL" value={c.href} sx={{ flex: 1 }} onChange={(e) => setPersonal({ contacts: p.contacts.map((x, k) => (k === i ? { ...x, href: e.target.value } : x)) })} />
                  <IconButton aria-label="Remove" onClick={() => setPersonal({ contacts: p.contacts.filter((_, k) => k !== i) })}><DeleteOutlineRoundedIcon /></IconButton>
                </Stack>
              ))}
              <Button startIcon={<AddRoundedIcon />} size="small" onClick={() => setPersonal({ contacts: [...(p.contacts || []), { label: "", handle: "", href: "" }] })}>Add contact</Button>
            </Box>
          </Box>
        )}

        {/* WORK / PROJECTS */}
        {tab === 1 && (
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              <strong>Featured</strong> projects appear under “Professional Work” with a screenshot; the rest become “Side Projects.”
            </Typography>
            {doc.projects.map((pr, i) => (
              <ItemCard key={i} title={pr.title} subtitle={pr.kind} badge={pr.featured ? "Featured" : null} onUp={() => move("projects", i, -1)} onDown={() => move("projects", i, 1)} onDelete={() => removeItem("projects", i)}>
                <FormControlLabel control={<Switch checked={!!pr.featured} onChange={(e) => updateItem("projects", i, { featured: e.target.checked })} />} label="Featured (Professional Work)" sx={{ mb: 1 }} />
                <F label="Title" value={pr.title} onChange={(v) => updateItem("projects", i, { title: v })} />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <F label="Kind" hint="e.g. Live commerce · Entiovi" value={pr.kind} onChange={(v) => updateItem("projects", i, { kind: v })} />
                  <F label="Year" value={pr.year} onChange={(v) => updateItem("projects", i, { year: v })} />
                </Stack>
                <F label="Description" value={pr.description} onChange={(v) => updateItem("projects", i, { description: v })} multiline />
                <F label="Image path" hint="e.g. /projects/popstore.jpg — leave empty for the monogram fallback" value={pr.image} onChange={(v) => updateItem("projects", i, { image: v })} />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <F label="Live link" value={pr.link} onChange={(v) => updateItem("projects", i, { link: v })} />
                  <F label="GitHub" value={pr.github} onChange={(v) => updateItem("projects", i, { github: v })} />
                </Stack>
                <CsvField label="Tags" hint="Comma separated" value={pr.tags} onChange={(v) => updateItem("projects", i, { tags: v })} />
              </ItemCard>
            ))}
            <Button startIcon={<AddRoundedIcon />} variant="outlined" onClick={() => addItem("projects", { title: "New project", kind: "", year: "", description: "", image: null, tags: [], link: null, github: null, featured: false })}>Add project</Button>
          </Box>
        )}

        {/* CAREER */}
        {tab === 2 && (
          <Box>
            {doc.experiences.map((ex, i) => (
              <ItemCard key={i} title={ex.role} subtitle={`${ex.company} · ${ex.period}`} onUp={() => move("experiences", i, -1)} onDown={() => move("experiences", i, 1)} onDelete={() => removeItem("experiences", i)}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <F label="Role" value={ex.role} onChange={(v) => updateItem("experiences", i, { role: v })} />
                  <F label="Designation" hint="e.g. Software Developer" value={ex.designation} onChange={(v) => updateItem("experiences", i, { designation: v })} />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <F label="Company" value={ex.company} onChange={(v) => updateItem("experiences", i, { company: v })} />
                  <F label="Location" value={ex.location} onChange={(v) => updateItem("experiences", i, { location: v })} />
                </Stack>
                <F label="Period" hint='e.g. "Apr 2025 — Jun 2026" or "Feb 2022 — Present"' value={ex.period} onChange={(v) => updateItem("experiences", i, { period: v })} />
                <F label="Summary" value={ex.summary} onChange={(v) => updateItem("experiences", i, { summary: v })} multiline />
                <LinesField label="Highlights" hint="One per line" value={ex.highlights} onChange={(v) => updateItem("experiences", i, { highlights: v })} />
                <CsvField label="Tech" hint="Comma separated" value={ex.tech} onChange={(v) => updateItem("experiences", i, { tech: v })} />
                <Typography variant="overline" sx={{ color: "text.secondary", display: "block", mb: 1 }}>Metric (optional)</Typography>
                <Stack direction="row" spacing={1.5} sx={{ mb: 2 }}>
                  <TextField size="small" label="Value" value={ex.metric?.value ?? ""} sx={{ width: 90 }} onChange={(e) => updateItem("experiences", i, { metric: { ...(ex.metric || {}), value: e.target.value } })} />
                  <TextField size="small" label="Suffix" value={ex.metric?.suffix ?? ""} sx={{ width: 90 }} onChange={(e) => updateItem("experiences", i, { metric: { ...(ex.metric || {}), suffix: e.target.value } })} />
                  <TextField size="small" label="Label" value={ex.metric?.label ?? ""} fullWidth onChange={(e) => updateItem("experiences", i, { metric: { ...(ex.metric || {}), label: e.target.value } })} />
                </Stack>
                <LinksEditor links={ex.links || []} onChange={(links) => updateItem("experiences", i, { links })} />
              </ItemCard>
            ))}
            <Button startIcon={<AddRoundedIcon />} variant="outlined" onClick={() => addItem("experiences", { company: "New company", role: "Role", designation: "", period: "", location: "", summary: "", highlights: [], tech: [], links: [] })}>Add role</Button>
          </Box>
        )}

        {/* EDUCATION */}
        {tab === 3 && (
          <Box>
            {doc.education.map((ed, i) => (
              <ItemCard key={i} title={ed.degree} subtitle={ed.school} onUp={() => move("education", i, -1)} onDown={() => move("education", i, 1)} onDelete={() => removeItem("education", i)}>
                <F label="Degree" value={ed.degree} onChange={(v) => updateItem("education", i, { degree: v })} />
                <F label="School" value={ed.school} onChange={(v) => updateItem("education", i, { school: v })} />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <F label="Period" value={ed.period} onChange={(v) => updateItem("education", i, { period: v })} />
                  <F label="Score" hint="e.g. DGPA 8.94" value={ed.score} onChange={(v) => updateItem("education", i, { score: v })} />
                </Stack>
              </ItemCard>
            ))}
            <Button startIcon={<AddRoundedIcon />} variant="outlined" onClick={() => addItem("education", { degree: "New degree", school: "", period: "", score: "" })}>Add education</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
