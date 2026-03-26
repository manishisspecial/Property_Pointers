import DeveloperProfileClient from "@/components/DeveloperProfileClient";

export default async function DeveloperProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DeveloperProfileClient slug={slug} />;
}
