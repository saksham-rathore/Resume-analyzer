export default function Logo({ size = 32, color = "oklch(90.8% 0.008 264.534)" }) {
  const u = size / 6
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="0" width="20" height="20" fill={color} />
      <rect x="60" y="0" width="20" height="20" fill={color} />
      <rect x="20" y="20" width="20" height="20" fill={color} />
      <rect x="40" y="20" width="20" height="20" fill={color} />
      <rect x="60" y="20" width="20" height="20" fill={color} />
      <rect x="80" y="20" width="20" height="20" fill={color} />
      <rect x="0" y="40" width="20" height="20" fill={color} />
      <rect x="20" y="40" width="20" height="20" fill={color} />
      <rect x="40" y="40" width="20" height="20" fill={color} />
      <rect x="60" y="40" width="20" height="20" fill={color} />
      <rect x="80" y="40" width="20" height="20" fill={color} />
      <rect x="100" y="40" width="20" height="20" fill={color} />
      <rect x="40" y="60" width="20" height="20" fill={color} />
      <rect x="60" y="60" width="20" height="20" fill={color} />
      <rect x="40" y="80" width="20" height="20" fill={color} />
      <rect x="20" y="100" width="20" height="20" fill={color} />
      <rect x="60" y="100" width="20" height="20" fill={color} />
    </svg>
  )
}