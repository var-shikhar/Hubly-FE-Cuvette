import {
  ArcElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"
import "../../components/css/analytics.css"
import Header from "../../components/header"
import useAnalytics from "../../hooks/use-analytics"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// The Analytics component - Rendering the Header and metric cards for displaying analytics data
const Analytics = () => {
  const { data } = useAnalytics()
  return (
    <>
      <Header title="Analytics" />
      <div className="metric-card-wrapper">
        <MissedChatsChart leadData={data?.leadGraph ?? []} />
        <AverageReplyTime total={data?.averateResponseTime ?? 0} />
        <ResolvedTickets total={data?.totalResolvedLeads ?? 0} />
        <TotalChats total={data?.totalLeads ?? 0} />
      </div>
    </>
  )
}

export default Analytics

// The MissedChatsChart component - Chart displaying missed chat data over multiple weeks
const MissedChatsChart = ({ leadData }: { leadData: number[] }) => {
  const data: ChartData<"line"> = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
    ],
    datasets: [
      {
        label: "Missed Chats",
        data: leadData,
        borderColor: "limegreen",
        backgroundColor: "black",
        tension: 0.4,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  }

  return (
    <>
      <h3 className="metric-title">Missed Chats</h3>
      <Line data={data} options={options} />
    </>
  )
}

// The ResolvedTickets component - Displays a Doughnut chart showing resolved vs. pending tickets
const ResolvedTickets = ({ total }: { total: number }) => {
  const data: ChartData<"doughnut"> = {
    labels: ["Resolved", "Pending"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["limegreen", "#eee"],
        borderWidth: 0,
      },
    ],
  }

  const options: ChartOptions<"doughnut"> = {
    cutout: "80%",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  }

  return (
    <div className="metric-card">
      <div className="metric-header">
        <h3 className="metric-title">Resolved Tickets</h3>
        <small>
          A callback system on a website, as well as proactive invitations, help
          to attract even more customers. A separate round button for ordering a
          call with a small animation helps to motivate more customers to make
          calls.
        </small>
      </div>
      <div className="metric-detail">
        <div className="doughnut-container">
          <Doughnut
            data={data}
            options={options}
            className="doughnut-wrapper"
          />
          <div className="doughnut-text">{total}%</div>
        </div>
      </div>
    </div>
  )
}

// The AverageReplyTime component - Displays average reply time in seconds
const AverageReplyTime = ({ total }: { total: number }) => (
  <div className="metric-card">
    <div className="metric-header">
      <h3 className="metric-title">Average Reply Time</h3>
      <small>
        For highest customer satisfaction rates you should aim to reply to an
        incoming customer's message in 15 seconds or less. Quick responses will
        get you more conversations, help you earn customers trust and make more
        sales.
      </small>
    </div>
    <p className="metric-detail">{total} secs</p>
  </div>
)

// The TotalChats component - Displays total number of chats for the selected period
const TotalChats = ({ total }: { total: number }) => (
  <div className="metric-card">
    <div className="metric-header">
      <h3 className="metric-title">Total Chats</h3>
      <small>
        This metric Shows the total number of chats for all Channels for the
        selected the selected period
      </small>
    </div>
    <p className="metric-detail">
      {total} {total > 1 ? "Chats" : "Chat"}
    </p>
  </div>
)
