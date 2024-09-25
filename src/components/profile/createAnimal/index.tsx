'use client'

import { createNewPet } from '@/actions/photo-post'
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
import { InputWithFix } from '@/components/ui/input-fix'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudUpload, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const createAnimalFormSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  animalType: z.string().min(1, { message: 'Selecione o tipo de animal.' }),
  age: z
    .string({ invalid_type_error: 'A idade deve ser um número.' })
    .min(0, { message: 'A idade não pode ser negativa.' }),
  weight: z
    .string({ invalid_type_error: 'O peso deve ser um número.' })
    .min(0, { message: 'O peso não pode ser negativo.' }),
  gender: z.string().min(1, { message: 'Selecione o gênero do animal.' }),
  breed: z.string().min(1, { message: 'A raça/tipo é obrigatória.' }),
  castrated: z.enum(['sim', 'não'], {
    required_error: 'Informe se há uma condição especial.',
  }),
  vaccinated: z.enum(['sim', 'não'], {
    required_error: 'Informe se o animal está vacinado.',
  }),
  specialCondition: z.enum(['sim', 'não'], {
    required_error: 'Informe se há uma condição especial.',
  }),
  specialConditionDescription: z.string().optional(),
  responsibleContact: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      'O número de contato deve estar no formato (00) 00000-0000.',
    )
    .transform((value) => value.replace(/[^\d]/g, '')),
})

const refinedSimplifiedAnimalFormSchema = createAnimalFormSchema.refine(
  ({ specialCondition, specialConditionDescription }) => {
    if (specialCondition === 'sim' && !specialConditionDescription) return false
    return true
  },
  {
    message: 'Especifique a condição especial.',
    path: ['specialConditionDescription'],
  },
)

export { refinedSimplifiedAnimalFormSchema }

export type CreateAnimalFormData = z.infer<
  typeof refinedSimplifiedAnimalFormSchema
>

export function CreateANewAnimalForm() {
  const form = useForm<CreateAnimalFormData>({
    resolver: zodResolver(refinedSimplifiedAnimalFormSchema),
    defaultValues: {
      name: '',
      animalType: '',
      age: '',
      weight: '',
      gender: '',
      breed: '',
      castrated: 'não',
      vaccinated: 'não',
      specialCondition: 'não',
      specialConditionDescription: '',
      responsibleContact: '',
    },
  })

  const [files, setFiles] = useState<File[]>([])

  const imagePreview = useMemo(() => {
    if (files.length > 0) return URL.createObjectURL(files[0])
    return null
  }, [files])

  const onDrop = (acceptedFiles: File[]) => setFiles(acceptedFiles)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
  })
  const { watch, reset } = form

  async function onSubmit(data: CreateAnimalFormData) {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob)
    })

    if (files.length > 0) {
      formData.append('img', files[0])
    }
    console.log(formData)
    const result = await createNewPet(formData)
    if (!result) {
      reset()
    } else toast.error(result.message)
  }

  const watchSpecialCondition = watch('specialCondition')

  function removeImage() {
    setFiles([])
  }

  return (
    <Card className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 grid grid-cols-2 gap-5"
        >
          {imagePreview ? (
            <div className="flex overflow-hidden rounded-lg relative">
              <div
                style={{ backgroundImage: `url(${imagePreview})` }}
                className="h-full bg-cover bg-center w-full bg-no-repeat"
              />
              <Button
                size="icon"
                variant="destructive"
                onClick={removeImage}
                className="right-2 top-2 absolute w-8 h-8"
              >
                <X size={16} />
              </Button>
            </div>
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
                      <b className="text-foreground">
                        Clique para fazer upload
                      </b>{' '}
                      ou arraste e solte
                    </p>
                    <p>Tamanho máximo do arquivo 50 MB.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        className="font-medium placeholder:italic"
                        placeholder="Digite o nome..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animalType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Animal</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de animal" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-32">
                            <SelectItem value="Cachorro">Cachorro</SelectItem>
                            <SelectItem value="Gato">Gato</SelectItem>
                            <SelectItem value="Coelho">Coelho</SelectItem>
                            <SelectItem value="Hamster">Hamster</SelectItem>
                            <SelectItem value="Peixe">Peixe</SelectItem>
                            <SelectItem value="Pássaro">Pássaro</SelectItem>
                            <SelectItem value="Tartaruga">Tartaruga</SelectItem>
                            <SelectItem value="Porquinho-da-Índia">
                              Porquinho-da-Índia
                            </SelectItem>
                            <SelectItem value="Furão">Furão</SelectItem>
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <InputWithFix
                        className="font-medium placeholder:italic"
                        placeholder="Digite a idade"
                        type="number"
                        suffix={<span>anos</span>}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso</FormLabel>
                    <FormControl>
                      <InputWithFix
                        className="font-medium placeholder:italic"
                        placeholder="Digite o peso"
                        suffix={<span>kg</span>}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fêmea">Fêmea</SelectItem>
                          <SelectItem value="Macho">Macho</SelectItem>
                          <SelectItem value="Não Identificado">
                            Não Identificado
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raça/Tipo</FormLabel>
                    <FormControl>
                      <InputWithFix
                        className="font-medium placeholder:italic"
                        placeholder="Digite a raça/tipo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-wrap justify-around gap-2 w-full">
              <FormField
                control={form.control}
                name="specialCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condição especial</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="não"
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sim" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="não" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator orientation="vertical" />
              <FormField
                control={form.control}
                name="vaccinated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vacinado</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="não"
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sim" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="não" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator orientation="vertical" />
              <FormField
                control={form.control}
                name="castrated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Castrado</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="não"
                        className="flex space-x-1"
                      >
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sim" />
                          </FormControl>
                          <FormLabel className="font-normal">Sim</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="não" />
                          </FormControl>
                          <FormLabel className="font-normal">Não</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {watchSpecialCondition === 'sim' && (
              <FormField
                control={form.control}
                name="specialConditionDescription"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Especifica a condição especial</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="responsibleContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de contato</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(00) 00000-0000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Adicionar
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
