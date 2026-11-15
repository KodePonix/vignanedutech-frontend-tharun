import { useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Copy, Plus, Trash2, Upload, X } from 'lucide-react'
import { uploadFile } from '../api'
import { Icon, ICON_NAMES } from '../content/icons'

// Blank value for a new list item, based on its field definitions.
export function blankItem(fields) {
  return Object.fromEntries(fields.map(f => [f.key,
    f.type === 'list' || f.type === 'tags' ? [] :
    f.type === 'button' ? { label: '', href: '' } :
    f.type === 'icon' ? 'Sparkles' :
    f.type === 'bool' ? true :
    f.type === 'number' ? 0 : '']))
}

export function FieldList({ fields, value, onChange }) {
  return <div className="cms-fields">
    {fields.map(f => <Field key={f.key} field={f} value={value?.[f.key]} onChange={v => onChange({ ...value, [f.key]: v })} />)}
  </div>
}

export function Field({ field: f, value, onChange }) {
  const label = <span className="cms-label">{f.label}</span>
  switch (f.type) {
    case 'textarea':
      return <label className="cms-field wide">{label}<textarea rows={f.rows || 3} value={value ?? ''} onChange={e => onChange(e.target.value)} /></label>
    case 'heading':
      return <label className="cms-field wide">{label}<textarea rows={2} value={value ?? ''} onChange={e => onChange(e.target.value)} />
        <small className="cms-hint">Press Enter for a line break. Wrap words in *stars* to show them in gold italic.</small></label>
    case 'image':
      return <ImageField label={f.label} value={value} onChange={onChange} accept="image/*" />
    case 'file':
      return <ImageField label={f.label} value={value} onChange={onChange} accept=".pdf,.doc,.docx,image/*" isFile />
    case 'icon':
      return <label className="cms-field">{label}<div className="cms-icon-select"><span><Icon name={value} size={18} /></span>
        <select value={value || ''} onChange={e => onChange(e.target.value)}>{ICON_NAMES.map(n => <option key={n}>{n}</option>)}</select></div></label>
    case 'button':
      return <div className="cms-field wide">{label}<div className="cms-pair">
        <input placeholder="Button text" value={value?.label ?? ''} onChange={e => onChange({ ...value, label: e.target.value })} />
        <input placeholder="Link, e.g. #contact or https://…" value={value?.href ?? ''} onChange={e => onChange({ ...value, href: e.target.value })} />
      </div><small className="cms-hint">Leave the text empty to hide this button.</small></div>
    case 'tags':
      return <TagsField label={label} value={value} onChange={onChange} />
    case 'number':
      return <label className="cms-field">{label}<input type="number" min={f.min} max={f.max} value={value ?? 0} onChange={e => onChange(Number(e.target.value))} /></label>
    case 'bool':
      return <label className="cms-field cms-check"><input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} />{f.label}</label>
    case 'select':
      return <label className="cms-field">{label}<select value={value ?? ''} onChange={e => onChange(e.target.value)}>{f.options.map(o => <option key={o}>{o}</option>)}</select></label>
    case 'list':
      return <ListField field={f} value={value || []} onChange={onChange} />
    default:
      return <label className="cms-field">{label}<input value={value ?? ''} list={f.suggestions ? `dl-${f.key}` : undefined} onChange={e => onChange(e.target.value)} />
        {f.suggestions && <datalist id={`dl-${f.key}`}>{f.suggestions.map(s => <option key={s} value={s} />)}</datalist>}</label>
  }
}

function TagsField({ label, value, onChange }) {
  const [text, setText] = useState((value || []).join(', '))
  return <label className="cms-field wide">{label}<input value={text} onChange={e => {
    setText(e.target.value)
    onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))
  }} /><small className="cms-hint">Separate items with commas.</small></label>
}

function ImageField({ label, value, onChange, accept, isFile }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  async function pick(e) {
    const file = e.target.files?.[0]; e.target.value = ''
    if (!file) return
    setBusy(true); setError('')
    try { onChange(await uploadFile(file)) } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="cms-field wide">
    <span className="cms-label">{label}</span>
    <div className="cms-image">
      {!isFile && <div className="cms-image-preview">{value ? <img src={value} alt="" /> : <span>No image</span>}</div>}
      <div className="cms-image-controls">
        <input placeholder={isFile ? 'File URL' : 'Image URL'} value={value ?? ''} onChange={e => onChange(e.target.value)} />
        <div className="cms-row">
          <button type="button" className="outline-btn" disabled={busy} onClick={() => input.current.click()}><Upload size={14} /> {busy ? 'Uploading…' : `Upload ${isFile ? 'file' : 'image'}`}</button>
          {value && <button type="button" className="outline-btn" onClick={() => onChange('')}><X size={14} /> Remove</button>}
        </div>
        {error && <small className="cms-error">{error}</small>}
      </div>
    </div>
    <input ref={input} type="file" accept={accept} hidden onChange={pick} />
  </div>
}

function ListField({ field: f, value, onChange }) {
  const [open, setOpen] = useState(null)
  const update = (i, item) => onChange(value.map((x, j) => j === i ? item : x))
  const move = (i, d) => { const n = [...value], t = i + d; if (t < 0 || t >= n.length) return;[n[i], n[t]] = [n[t], n[i]]; onChange(n); setOpen(open === i ? t : open) }
  return <div className="cms-field wide cms-list">
    <span className="cms-label">{f.label} <i>({value.length})</i></span>
    {value.map((item, i) => <div className="cms-list-item" key={i}>
      <div className="cms-list-head" onClick={() => setOpen(open === i ? null : i)}>
        {open === i ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        {item.icon && <Icon name={item.icon} size={15} />}
        <b>{item[f.itemLabel] || item.label || item.title || `Item ${i + 1}`}</b>
        <div className="row-actions" onClick={e => e.stopPropagation()}>
          <button type="button" title="Move up" onClick={() => move(i, -1)}><ArrowUp size={14} /></button>
          <button type="button" title="Move down" onClick={() => move(i, 1)}><ArrowDown size={14} /></button>
          <button type="button" title="Duplicate" onClick={() => onChange([...value.slice(0, i + 1), structuredClone(item), ...value.slice(i + 1)])}><Copy size={14} /></button>
          <button type="button" title="Delete" onClick={() => confirm('Delete this item?') && onChange(value.filter((_, j) => j !== i))}><Trash2 size={14} /></button>
        </div>
      </div>
      {open === i && <div className="cms-list-body"><FieldList fields={f.fields} value={item} onChange={v => update(i, v)} /></div>}
    </div>)}
    <button type="button" className="outline-btn cms-add" onClick={() => { onChange([...value, blankItem(f.fields)]); setOpen(value.length) }}><Plus size={14} /> Add item</button>
  </div>
}
