export default function UserProfile({ params }: { params: { user: string } }) {
  return <div>User: {params.user}</div>
}
