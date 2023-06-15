import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
// import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
// Chart.register(...registerables);

export const CheervoteResultPieChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        // label: '# of Votes',
        data: data,
        backgroundColor: [
          // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOption: ChartOptions<'pie'> = {
    // サイズ変更の際に、元のキャンバスのアスペクト比(width/height)を維持
    maintainAspectRatio: false,
    layout: {
      padding: {
        // left: 50,
        // right: 50,
        top: 10,
        bottom: 10,
      },
    },
    plugins: {
      // legend: {
      //   display: false,
      // },

      // chartjs-plugin-datalabelsの設定値
      datalabels: {
        align: 'end', // 'start','end', 'center'
        anchor: 'end', // 'start','end', 'center'
        offset: -130,
        color: '#fff',
        // color: 'black',
        font: {
          weight: 'bold',
          size: 24,
          family: 'Noto Sans JP',
        },
        textAlign: 'center',
        textStrokeColor: '#6B7280',
        textStrokeWidth: 2,
        textShadowBlur: 3,
        textShadowColor: '#6B7280',
        formatter: (value: number, ctx: Context) => {
          const label = ctx.chart.data.labels![ctx.dataIndex];
          let sum = 0;
          const dataArray = ctx.chart.data.datasets[0].data as number[];
          dataArray.map((n) => {
            sum += n;
          });
          // 値が0の場合はラベルを表示しない
          if (value) {
            const percentage = ((value * 100) / sum).toFixed(1) + '%';
            return label + '\n' + percentage + '\n' + value + '票';
            // return label + '\n' + percentage;
          } else {
            return '';
          }
        },
      },
    },
  };

  // console.log('CheervoteResultレンダリング');
  // chartData.labels = labels;
  // chartData.datasets[0].data = data;
  // console.log(chartData);
  // console.log(chartData.labels);
  // console.log(chartData.datasets[0].data);
  return (
    <div className='mx-auto max-w-min'>
      <Pie data={chartData} height={500} width={600} options={chartOption} />
    </div>
  );
};
