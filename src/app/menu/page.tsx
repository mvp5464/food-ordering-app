import MenuClientPage from "@/components/clientComp/MenuClient";
import { getMenuItems } from "@/utils/serverCalls";

export const revalidate = 3600;

export default async function MenuPage() {
  const menuItems1 = await getMenuItems();
  return (
    <>
      <MenuClientPage allMenuItems={JSON.parse(JSON.stringify(menuItems1))} />
    </>
  );
}
