export const addTheme = (
    {
        // Default Value
        theme_title = '',
        theme_fontHeading = '',
        theme_fontParagraph = '',
        theme_fontDetails = '',
        theme_colorBody = '',
        theme_colorContainer = '',
        theme_colorNavigation = '',
        theme_darkMode = 1,
        theme_imageSlider = 0,
        theme_colorGraph = ''
    } = {}
  ) => ({
    type: 'ADD_THEME',
    theme: {
        // Actual Value
        theme_title,
        theme_fontHeading,
        theme_fontParagraph,
        theme_fontDetails,
        theme_colorBody,
        theme_colorContainer,
        theme_colorNavigation,
        theme_darkMode,
        theme_imageSlider,
        theme_colorGraph
    }
});

// EDIT_THEME
export const editTheme = (data) => ({
    type: 'EDIT_THEME',
    data
})