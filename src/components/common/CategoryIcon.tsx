import React from 'react';
import {
  Wrench,
  Zap,
  Sparkles,
  Hammer,
  Snowflake,
  Paintbrush,
  Palette,
  Code,
  Camera,
  BookOpen,
  Tv,
  Trees,
  Briefcase,
  LucideProps,
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export default function CategoryIcon({ name, ...props }: CategoryIconProps) {
  switch (name.toLowerCase()) {
    case 'wrench':
    case 'plumbing':
      return <Wrench {...props} />;
    case 'zap':
    case 'electrical':
      return <Zap {...props} />;
    case 'sparkles':
    case 'cleaning':
      return <Sparkles {...props} />;
    case 'hammer':
    case 'carpentry':
      return <Hammer {...props} />;
    case 'snowflake':
    case 'ac repair':
    case 'ac-repair':
      return <Snowflake {...props} />;
    case 'paintbrush':
    case 'painting':
      return <Paintbrush {...props} />;
    case 'palette':
    case 'graphic design':
    case 'graphic-design':
      return <Palette {...props} />;
    case 'code':
    case 'web development':
    case 'web-development':
      return <Code {...props} />;
    case 'camera':
    case 'photography':
      return <Camera {...props} />;
    case 'bookopen':
    case 'tutoring':
      return <BookOpen {...props} />;
    case 'tv':
    case 'home appliance repair':
    case 'home-appliance-repair':
      return <Tv {...props} />;
    case 'trees':
    case 'gardening':
      return <Trees {...props} />;
    default:
      return <Briefcase {...props} />;
  }
}
