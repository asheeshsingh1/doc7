import {
    Collection,
    CustomizationHeaderPreset,
    CustomizationSettings,
    Site,
    SiteCustomizationSettings,
    Space,
} from '@gitbook/api';

import { HeaderMobileMenu } from '@/components/Header/HeaderMobileMenu';
import { LogoIcon } from '@/components/icons';
import { Image } from '@/components/utils';
import { absoluteHref } from '@/lib/links';
import { tcls } from '@/lib/tailwind';
import { getContentTitle } from '@/lib/utils';

import { Link } from '../primitives';

interface HeaderLogoProps {
    parent: Site | Collection | null;
    space: Space;
    customization: CustomizationSettings | SiteCustomizationSettings;
}

/**
 * Render the logo for a space using the customization settings.
 */

export function HeaderLogo(props: HeaderLogoProps) {
    const { customization } = props;

    return (
        <div className={tcls('flex', 'flex-row', 'gap-3')}>
            <HeaderMobileMenu
                className={tcls(
                    'lg:hidden',
                    customization.header.preset === CustomizationHeaderPreset.Default
                        ? ['text-dark', 'dark:text-light']
                        : 'text-header-link',
                )}
            />
            <Link
                href={absoluteHref('')}
                className={tcls(
                    'group/headerlogo',
                    'flex-1',
                    'flex',
                    'flex-row',
                    'items-center',
                    'shrink-0',
                )}
            >
                {customization.header ? (
                    <>
                        <Image
                            alt="Logo"
                            sources={{
                                light: {
                                    src: 'https://www.builder.ai/images/Builder.ai_Black.svg',
                                },
                                dark: true
                                    ? {
                                          src: 'https://www.builder.ai/images/Builder.ai_Black.svg',
                                      }
                                    : null,
                            }}
                            sizes={[
                                {
                                    media: '(max-width: 1024px)',
                                    width: 128,
                                },
                                {
                                    width: 192,
                                },
                            ]}
                            priority="high"
                            style={tcls(
                                'max-w-[8rem]',
                                'lg:max-w-[12rem]',
                                'max-h-[3rem]',
                                'rounded',
                                'straight-corners:rounded-sm',
                                'overflow-hidden',
                                'object-contain',
                                'object-left',
                            )}
                        />
                        <div
                            style={{
                                padding: '1px',
                                margin: '10px',
                                marginLeft: '20px',
                                marginTop: '20px',
                                fontSize: '30px',
                                fontWeight: 'lighter',
                            }}
                        >
                            IDE
                        </div>
                    </>
                ) : (
                    <>
                        <LogoFallback {...props} />
                    </>
                )}
            </Link>
        </div>
    );
}

function LogoFallback(props: HeaderLogoProps) {
    const { parent, space, customization } = props;
    const customIcon = 'icon' in customization.favicon ? customization.favicon.icon : undefined;
    const customEmoji = 'emoji' in customization.favicon ? customization.favicon.emoji : undefined;
    return (
        <>
            <LogoIcon
                icon={customIcon}
                emoji={customEmoji}
                alt=""
                sizes={[{ width: 32 }]}
                style={['object-contain', 'size-8']}
                fetchPriority="high"
            />
            <h1
                className={tcls(
                    'text-pretty',
                    'line-clamp-3',
                    'leading-[1.1]',
                    'tracking-tight',
                    'max-w-[18ch]',
                    'lg:max-w-[24ch]',
                    'lg:text-lg/tight',
                    'font-semibold',
                    'ms-3',
                    customization.header.preset === CustomizationHeaderPreset.Default ||
                        customization.header.preset === CustomizationHeaderPreset.None
                        ? ['text-dark', 'dark:text-light']
                        : 'text-header-link',
                )}
            >
                {getContentTitle(space, customization, parent)}
            </h1>
        </>
    );
}
