import DataLoader from 'dataloader';
import { Layout } from '../entities/Layout';

export const createLayoutLoader = () =>
  new DataLoader<string, Layout>(async (layoutIds) => {
    const layouts = await Layout.findByIds(layoutIds as string[]);
    const layoutIdToLayout: Record<string, Layout> = {};
    layouts.forEach((layout) => {
      layoutIdToLayout[layout.id] = layout;
    });

    // Return array of layouts
    return layoutIds.map((layoutId) => layoutIdToLayout[layoutId]);
  });
