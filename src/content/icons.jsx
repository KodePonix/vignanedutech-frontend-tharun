import {
  Award, BookOpen, Bot, Brain, CircuitBoard, Clock, Code2, Cpu, Globe2, GraduationCap,
  Handshake, Lightbulb, Mail, MapPin, MessageCircle, Monitor, Phone, Play, Rocket, School,
  Sparkles, Star, Target, Trophy, Users, Wrench, Zap, Atom, Cog, Microscope, Palette,
  Puzzle, Heart, ShieldCheck, Layers, Plane, Printer, Wifi, TrendingUp, ChartColumnIncreasing, Medal
} from 'lucide-react'

// Icons the admin can pick from. Content stores the icon *name* (string).
export const ICONS = {
  Award, Atom, BookOpen, Bot, Brain, CircuitBoard, Clock, Code2, Cog, Cpu, Globe2, GraduationCap,
  Handshake, Heart, Layers, Lightbulb, Mail, MapPin, MessageCircle, Microscope, Monitor, Palette,
  Phone, Plane, Play, Printer, Puzzle, Rocket, School, ShieldCheck, Sparkles, Star, Target, Trophy,
  Users, Wifi, Wrench, Zap, TrendingUp, ChartColumnIncreasing, Medal
}
export const ICON_NAMES = Object.keys(ICONS)

export function Icon({ name, ...props }) {
  const C = ICONS[name] || Sparkles
  return <C {...props} />
}
