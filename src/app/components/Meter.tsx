
interface MeterProps {
  width: number;
  height: number;
  backgroundColor: string;
  barColor: string;
  quota: number;
  usage: number;
}

const Meter = ({
  width,
  height,
  backgroundColor,
  barColor,
  quota,
  usage
}: MeterProps) => {
  const quotaWidth = 0.75 * width;
  const quotaPct = usage / quota
  const barWidth = quotaPct * quotaWidth;

  return (
    <svg fill={backgroundColor} width={width} height={height}>
      <rect width={width} height={height} fill={backgroundColor} />
      <rect width={barWidth} height={height} fill={barColor}></rect>
      <line 
        width={2}
        height={height}
        x1={quotaWidth}
        y1={0}
        x2={quotaWidth}
        y2={height}
        stroke={usage > quota ? backgroundColor : barColor}
        strokeDasharray="3 2"
      />
    </svg>
  )
}

export default Meter;