import wp from 'wp';

const { createContext } = wp.element;

/**
 * When useReactAccordion is true (Gutenberg sidebar), SEO check rows use
 * GutenbergSeoAnalysisCheckItemAccordion (wp.components.PanelBody) instead of SUI AccordionItem.
 */
const SeoAnalysisAccordionContext = createContext({
	useReactAccordion: false,
});

export default SeoAnalysisAccordionContext;
