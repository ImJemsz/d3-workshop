import PlotBarChart from "~/components/Plot_BarChart";
import BarChart from "../components/BarChart";
import RechartBarChart from "~/components/Rechart_BarChart";
import ChartJsBarChart from "~/components/ChartJS_BarChart";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <BarChart /> */}
      {/* <PlotBarChart /> */}
      <RechartBarChart />
      {/* <ChartJsBarChart /> */}
    </div>
  );
}

export default Home;
