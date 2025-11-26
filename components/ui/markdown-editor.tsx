'use client'

import { useRef, useState, useEffect } from 'react'
import { Bold, Italic, Code, Code2, List, Link2, Heading1, Heading2, Heading3, Table, Image, Eye, EyeOff } from 'lucide-react'
import MarkdownPreview from './markwown-preview'

type Props = {
  value: string
  onChange: (v: string) => void
  storageKey?: string
}

export default function MarkdownEditor({ value, onChange, storageKey = 'markdown-editor-content' }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [showPreview, setShowPreview] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved && !value) {
      onChange(saved)
    }
  }, [storageKey])

  useEffect(() => {
    if (value) {
      localStorage.setItem(storageKey, value)
    }
  }, [value, storageKey])

  const insert = (before: string, after = '') => {
    const el = ref.current
    if (!el) return

    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)

    const newText =
      value.slice(0, start) +
      before + selected + after +
      value.slice(end)

    onChange(newText)
  }

  const insertHeading = (level: number) => {
    insert(`${'#'.repeat(level)} `)
  }

  const insertTable = () => {
    const table = `| Column 1 | Column 2 |\n|---------|---------|\n| value 1 | value 2 |`
    insert(table)
  }

  const insertCodeBlock = () => {
    insert("```\n", "\n```")
  }

  const onImageUpload = async (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    const form = new FormData()
    form.append('file', file)

    // Send this formData to server

    // insert(`![image](${data.url})`)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap items-center">
        <button onClick={() => insert('**', '**')} className="p-2 hover:bg-muted rounded"><Bold size={18} /></button>
        <button onClick={() => insert('*', '*')} className="p-2 hover:bg-muted rounded"><Italic size={18} /></button>
        <button onClick={() => insert('`', '`')} className="p-2 hover:bg-muted rounded"><Code size={18} /></button>
        <button onClick={insertCodeBlock} className="p-2 hover:bg-muted rounded"><Code2 size={18} /></button>

        <button onClick={() => insert('- ')} className="p-2 hover:bg-muted rounded"><List size={18} /></button>
        <button onClick={() => insert('[text](', ')')} className="p-2 hover:bg-muted rounded"><Link2 size={18} /></button>

        <button onClick={() => insertHeading(1)} className="p-2 hover:bg-muted rounded"><Heading1 size={18} /></button>
        <button onClick={() => insertHeading(2)} className="p-2 hover:bg-muted rounded"><Heading2 size={18} /></button>
        <button onClick={() => insertHeading(3)} className="p-2 hover:bg-muted rounded"><Heading3 size={18} /></button>

        <button onClick={insertTable} className="p-2 hover:bg-muted rounded"><Table size={18} /></button>

        <label className="cursor-pointer p-2 hover:bg-muted rounded">
          <Image size={18} />
          <input type="file" className="hidden" onChange={onImageUpload} />
        </label>

        <div className="ml-auto">
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            className="p-2 hover:bg-muted rounded flex items-center gap-2"
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="text-sm">{showPreview ? 'Hide' : 'Show'} Preview</span>
          </button>
        </div>
      </div>

      <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
        <textarea
          ref={ref}
          className="w-full h-[350px] border rounded p-2 font-mono text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write your markdown here..."
        />

        {showPreview && (
          <div className="w-full h-[350px] border rounded p-4 overflow-y-auto bg-muted/20">
            <MarkdownPreview 
              content={value} 
              className="prose prose-sm max-w-none"
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  )
}