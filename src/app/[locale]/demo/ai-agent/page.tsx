import { redirect } from "next/navigation";

export default function AIAgentDemoRedirect({
  params,
}: {
  params: { locale: string };
}) {
  redirect(`/${params.locale}/demo`);
}
