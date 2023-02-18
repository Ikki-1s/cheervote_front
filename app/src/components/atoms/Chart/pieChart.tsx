import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { css } from '@emotion/react';
import { color } from 'styles/theme';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const divStyle = css`
  /* max-width: max-content; */
  /* margin-left: auto; */
  /* margin-right: auto; */
`;

export type PieChartProps = {
  labels: string[];
  data: number[];
  height?: number;
  width?: number;
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
  dataLabelFontSize?: number;
};

const default5Colors = [
  color.pink.normal,
  color.pieChart.liteGreen,
  color.yellow,
  color.blue.normal,
  color.deepBluePurple,
];

export const PieChart = ({
  labels,
  data,
  height = 500,
  width = 600,
  backgroundColor = default5Colors,
  borderColor = default5Colors,
  borderWidth = 1,
  dataLabelFontSize = 22,
}: PieChartProps) => {
  const chartData: ChartData<'pie'> = {
    labels: labels,
    datasets: [
      {
        // label: '# of Votes',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
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
      legend: {
        // 凡例を表示するか否か
        // display: false,
        labels: {
          color: color.text.normal,
        },
      },

      // chartjs-plugin-datalabelsの設定値
      datalabels: {
        align: 'end', // 'start','end', 'center'
        anchor: 'end', // 'start','end', 'center'
        offset: -135,
        color: color.white,
        font: {
          family: 'Noto Sans JP',
          weight: 'bold',
          size: dataLabelFontSize,
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
          } else {
            return null;
          }
        },
      },
    },
  };

  return <Pie data={chartData} height={height} width={width} options={chartOptions} />;
};
