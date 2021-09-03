import DataLoader from 'dataloader';
import { Ascent } from '../entities/Ascent';

export interface AscentIds {
  problemId: string;
  userId: string;
}
export const createAscentLoader = () =>
  new DataLoader<AscentIds, Ascent | null>(async (keys) => {
    const ascents = await Ascent.findByIds(keys as any);
    const ascentIdsToAscent: Record<string, Ascent> = {};
    ascents.forEach((ascent) => {
      ascentIdsToAscent[`${ascent.userId}|${ascent.problemId}`] = ascent;
    });

    // Return array of current users ascents
    return keys.map(
      (key) => ascentIdsToAscent[`${key.userId}|${key.problemId}`]
    );
  });
