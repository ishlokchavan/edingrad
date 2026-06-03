import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Logo } from '@/components/sections/Logo';
import { Typography } from '@/components/sections/Typography';
import { Color } from '@/components/sections/Color';
import { Grid } from '@/components/sections/Grid';
import { Iconography } from '@/components/sections/Iconography';
import { DataViz } from '@/components/sections/DataViz';
import { Animation } from '@/components/sections/Animation';
import { Voice } from '@/components/sections/Voice';
import { Resources } from '@/components/sections/Resources';
import { WhatsNew } from '@/components/sections/WhatsNew';
import { Help } from '@/components/sections/Help';

/**
 * The guidelines render as one scrolling document with a sticky sidebar and
 * scroll-spy. Section order mirrors the registry in `src/lib/sections.ts`.
 */
export default function Page() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Logo />
      <Typography />
      <Color />
      <Grid />
      <Iconography />
      <DataViz />
      <Animation />
      <Voice />
      <Resources />
      <WhatsNew />
      <Help />
    </>
  );
}
