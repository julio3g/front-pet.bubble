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

// Campos para criar um novo animal, uteis que tem o ✅
// $response = [
//   'post_author' => $user_id,
//   'post_type' => 'post',
//   'post_status' => 'publish',
//   'post_title' => $animal_name,
//   'post_content' => $animal_name, ✅
//   'files' => $files, ✅
//   'meta_input' => [
//     'animal_type' => $animal_type, ✅
//     'animal_age' => $animal_age, ✅
//     'animal_carrying' => $animal_carrying, ✅
//     'animal_gender' => $animal_gender,✅
//     'animal_vaccinated' => $animal_vaccinated, ✅
//     'animal_castrated' => $animal_castrated, ✅
//     'animal_special_condition' => $animal_special_condition,✅
//     'animal_special_condition_description' => $animal_special_condition_description,✅
//     'visualizations' => 0
//   ],
// ];

export function CreateANewAnimalForm() {
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
    <Card className="mx-auto w-full p-6 max-h-[600px] h-full">
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
              className="mx-auto max-h-auto rounded-lg"
            />
          ) : (
            <div
              {...getRootProps()}
              className="border border-dashed flex border-slate-200 p-4 rounded-lg text-center cursor-pointer hover:bg-slate-50 duration-100"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Solte os arquivos aqui...</p>
              ) : (
                <div className="flex flex-col gap-3 flex-1 items-center justify-center">
                  <CloudUpload />
                  <div className="text-sm text-slate-500">
                    <p>
                      <b className="text-slate-950">Clique para fazer upload</b>{' '}
                      ou arraste e solte
                    </p>
                    <p>Tamanho máximo do arquivo 50 MB.</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-5">
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
  )
}
