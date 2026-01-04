import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Title
);

const WPMGraph = ({ wpmData, className }) => {
  // Get current/latest WPM from the most recent data point
  const currentWPM = wpmData && wpmData.length > 0 
    ? Math.round(wpmData[wpmData.length - 1].y) 
    : 0;

  // Determine time unit based on data density
  const getTimeUnit = () => {
    if (!wpmData || wpmData.length < 2) return 'day';
    const dateRange = new Date(wpmData[wpmData.length - 1].x) - new Date(wpmData[0].x);
    const days = dateRange / (1000 * 60 * 60 * 24);
    
    if (days > 365) return 'year';
    if (days > 60) return 'month';
    if (days > 14) return 'week';
    if (days > 2) return 'day';
    return 'hour';
  };

  // Auto-calculate point radius based on data points
  const pointRadius = wpmData.length > 50 ? 0 : wpmData.length > 20 ? 2 : 4;

  const chartData = {
    datasets: [{
      label: 'Words Per Minute',
      data: wpmData.map(item => ({
        x: item.x,
        y: item.y
      })),
      borderColor: 'rgb(245, 151, 47)',
      backgroundColor: 'rgba(245, 151, 47, 0.1)',
      borderWidth: 2,
      pointRadius: pointRadius,
      tension: 0.1,
      fill: true
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      },
      tooltip: {
        mode: wpmData.length > 20 ? 'nearest' : 'point',
        intersect: false,
        callbacks: {
          title: (context) => {
            const date = new Date(context[0].parsed.x);
            return date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: getTimeUnit(),
          tooltipFormat: 'MMM d, yyyy h:mm a',
          displayFormats: {
            hour: 'ha',
            day: 'MMM d',
            week: 'MMM d',
            month: 'MMM yyyy',
            year: 'yyyy'
          }
        },
        title: {
          display: false,
          text: 'Date',
          align: 'middle'
        },
        grid: {
          display: wpmData.length < 100
        }
      },
      y: {
        title: {
          display: true,
          text: 'Words Per Minute'
        },
        min: 0,
        suggestedMax: Math.max(...wpmData.map(item => item.y), 10) * 1.2
      }
    },
    interaction: {
      mode: wpmData.length > 50 ? 'index' : 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className={`${className} p-4 shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500 flex flex-col`} >
      <div className='flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50'>
        <div className='flex items-center gap-2'>
          <div className='w-1 h-6 bg-navOrange rounded-full'></div>
          <h2 className="text-xl font-bold text-white">WPM</h2>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-gray-400 text-sm'>Current:</span>
          <span className='text-navOrange text-xl font-bold'>{currentWPM}</span>
        </div>
      </div>
      <div className='flex-1 min-h-0'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WPMGraph;