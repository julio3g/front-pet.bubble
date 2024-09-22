'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),

  age: z
    .number()
    .min(1, 'A idade deve ser positiva')
    .refine((value) => !isNaN(value), 'A idade deve ser um número'),
})

type FormData = z.infer<typeof formSchema>

export default function CreateANewAnimal() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 0,
    },
  })

  const [files, setFiles] = useState<File[]>([])

  const imagePreview = useMemo(() => {
    if (files.length > 0) {
      return URL.createObjectURL(files[0])
    }
    return null
  }, [files])

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
  })

  const onSubmit = (data: FormData) => {
    console.log(data, files)
  }

  return (
    <div className="container flex h-screen w-screen items-center justify-center">
      <Card className="mx-auto w-full p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3  grid grid-cols-2 gap-5"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={1000}
                height={1000}
                className="mx-auto max-h-auto"
              />
            ) : (
              <div
                {...getRootProps()}
                className="border border-dashed border-gray-300 p-4 rounded-lg  text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Solte os arquivos aqui...</p>
                ) : (
                  <div className="flex flex-col gap-3 items-center">
                    <CloudUpload />
                    <div className="">
                      <p>
                        <b>Clique para fazer upload</b> ou arraste e solte
                      </p>
                      <p>Tamanho máximo do arquivo 50 MB.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col gap-5 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
