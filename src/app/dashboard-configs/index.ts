import { FuseConfig } from '@fuse/types';

/**
 * Default Fuse Configuration
 *
 * You can edit these options to change the default options. All these options also can be
 * changed per component basis. See `app/modules/authentication/login/login.component.ts`
 * constructor method to learn more about changing these options per component basis.
 */

export const fuseConfig: FuseConfig = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: 'theme-default',
    customScrollbars: true,
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            primaryBackground: 'gray-200',
            secondaryBackground: 'primary-700',
            folded: false,
            hidden: false,
            position: 'right',
            variant: 'vertical-style-1',
        },
        toolbar: { customBackgroundColor: false, background: 'gray-200', hidden: false, position: 'below-static' },
        footer: { customBackgroundColor: true, background: 'indigo-700', hidden: true, position: 'below-fixed' },
        sidepanel: { hidden: false, position: 'right' },
    },
};
