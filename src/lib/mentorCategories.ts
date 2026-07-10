/**
 * "Browse by Industry" categories painted into
 * public/images/mentor-gallery.png's left-hand sidebar. The image's own
 * right-hand mentor grid is a fully-rendered mockup with 20 baked-in
 * fictional names under these same category headers — that part is
 * decorative only (see ARCHITECTURE.md §2f), since overlaying real
 * mentor links on top of painted fictional photos/names would mean
 * either misrepresenting real accounts as those specific fictional
 * people or a confusing mismatch. The sidebar category buttons
 * themselves don't paint in any fictional identity, though, so those are
 * wired as real filters over the real mentor grid rendered below the
 * image.
 */

export interface MentorCategory {
  label: string;
  /** MentorProfile.careerSpecialties values this category matches. */
  specialties: string[];
  top: number;
  left: number;
  width: number;
  height: number;
}

export const MENTOR_CATEGORIES: MentorCategory[] = [
  { label: "Technology", specialties: ["Cybersecurity", "AI Architect", "Web Development & Programming"], top: 14.5, left: 16, width: 13, height: 4.7 },
  { label: "Finance", specialties: ["Business Acquisition", "Stock Trading", "Accounting"], top: 20.3, left: 16, width: 13, height: 4.7 },
  { label: "Healthcare", specialties: ["Healthcare (CNA, LPN, RN)"], top: 26, left: 16, width: 13, height: 4.7 },
  { label: "Entrepreneurship", specialties: ["Business Acquisition"], top: 32, left: 16, width: 13, height: 6.2 },
  { label: "Real Estate", specialties: ["Construction & Skilled Trades"], top: 39.5, left: 16, width: 13, height: 4.7 },
  { label: "Entertainment", specialties: ["Advertiser"], top: 45.5, left: 16, width: 13, height: 4.7 },
  { label: "Leadership", specialties: ["Military", "Police Officer", "Attorney"], top: 51.3, left: 16, width: 13, height: 4.7 },
];

/** Coordinates for the "View All Mentors" link right below the category list. */
export const VIEW_ALL_MENTORS_HOTSPOT = { top: 57.3, left: 16, width: 13, height: 4.3 };

/** Coordinates for the real search input overlaid on the "Find Your Mentor" tablet mockup. */
export const MENTOR_SEARCH_HOTSPOT = { top: 71.3, left: 4, width: 25, height: 3.6 };
