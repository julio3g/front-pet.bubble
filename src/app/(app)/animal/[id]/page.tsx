export default function SingleAnimal({ params }: { params: { id: number } }) {
  return <div>Single Animal, Animal: {params.id}</div>
}
