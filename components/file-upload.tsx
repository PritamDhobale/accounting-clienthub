"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface FileUploadProps {
  onUploadComplete?: (file: File) => void
  disabled?: boolean
}

export function FileUpload({ onUploadComplete, disabled = false }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploaded, setUploaded] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploaded(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate upload completion after 3 seconds
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setUploading(false)
      setUploaded(true)

      if (onUploadComplete) {
        onUploadComplete(file)
      }

      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      })
    }, 3000)
  }

  const handleRemove = () => {
    setFile(null)
    setUploaded(false)
    setProgress(0)
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} disabled={disabled} />
          <label
            htmlFor="file-upload"
            className={cn(
              "flex flex-col items-center justify-center cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-1">Drag and drop or click to upload</p>
            <p className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG</p>
          </label>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            {!uploaded ? (
              <Button variant="ghost" size="icon" onClick={handleRemove} disabled={uploading || disabled}>
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Check className="h-5 w-5 text-green-500" />
            )}
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-right text-muted-foreground">{progress}% uploaded</p>
            </div>
          )}

          {!uploaded && !uploading && (
            <Button onClick={handleUpload} className="w-full mt-2" disabled={disabled}>
              Upload File
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
