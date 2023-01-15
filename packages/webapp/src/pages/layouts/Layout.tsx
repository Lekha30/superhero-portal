import TopBar from "../../components/TopBar";


export const Layout = ({ children }: any) => {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
};
