module.exports = {
  SUMMER_CAMP_HERO_QUERY: `*[_type=="heroSection" && slug.current==$heroSlug][0]{
      title { first, second, third },
      tagline,
      description,
      campDates {
        camp1 { title, dates },
        camp2 { title, dates }
      },
      "backgroundVideoUrl": backgroundVideo.asset->url,
      "backgroundVideoSize": backgroundVideo.asset->size,
      "backgroundVideoMimeType": backgroundVideo.asset->mimeType,
      primaryCta { 
        text, 
        url, 
        newTab, 
        actionType 
      }
    }`,
  ADULT_FENCING_HERO_QUERY: `*[_type=="heroSection" && slug.current=="adult-fencing"][0]{
      title { first, second, third },
      tagline,
      description,
      background { asset, alt },
      backgroundMobile { asset, alt },
      primaryCta { text, url, newTab },
      secondaryCta { text, action }
    }`,
  COMPETITIVE_FENCING_HERO_QUERY: `*[_type=="heroSection" && slug.current=="competitiveEdge-section"][0]{
  title { first, second, third },
  tagline,
  description,
  background { asset, alt },
  backgroundMobile { asset, alt },
  primaryCta { text, url, newTab },
  secondaryCta { text, action }
}`,
  PRIVATE_TUTORING_HERO_QUERY: `*[_type=="heroSection" && slug.current=="privateFencing-section"][0]{
  title { first, second, third },
  tagline,
  description,
  background { asset, alt },
  backgroundMobile { asset, alt },
  primaryCta { text, url, newTab },
  secondaryCta { text, action }
}`,
  YOUTH_FENCING_HERO_QUERY: `*[_type=="heroSection" && slug.current=="youthfencing-section"][0]{
  title { first, second, third },
  tagline,
  description,
  background { asset, alt },
  backgroundMobile { asset, alt },
  primaryCta { text, url, newTab },
  secondaryCta { text, action }
}`,
  LANDING_PAGE_ABOUT_QUERY: `*[_type == "landingPageAbout"][0]{
  sectionHeader,
  contentParagraphs,
  blockquote,
  callToAction,
  video{
    ...,
    posterImage{
      asset->{
        _id,
        url
      },
      alt
    },
    videoFile{
      asset->{
        _id,
        url
      }
    }
  },
  statsWidget,
  seo
}`,
  REGISTRATION_SECTION_QUERY: `*[_type == "landingPageRegistrationSection" && slug.current == "registration-section"][0]{
      title,
      header {
        logo {
          asset->,
          alt
        },
        mainHeading {
          prefix,
          highlight
        },
        subtitle
      },
      platformShowcase {
        logo {
          asset->,
          alt
        },
        title,
        description
      },
      features[]{
        title,
        description
      },
      statistics[]{
        number,
        label
      },
      accessPortal {
        title,
        subtitle,
        qrCode {
          asset->,
          alt
        },
        ctaButton {
          text,
          url,
          openInNewTab
        },
        disclaimer
      },
      bottomQuote {
        quote,
        attribution
      }
    }`,
  LANDING_PAGE_GALLERY_SECTION_QUERY: `
      *[_type == "landingPageGallerySection"][0]{
        header {
          label,
          headingPrefix,
          headingHighlight,
          subtitle
        },
        galleryImages[]{
          src { asset-> },
          alt
        }
      }
    `,
  LANDING_PAGE_SOCIAL_MEDIA_QUERY: `
      *[_type == "socialMediaSection"][0]{
        sectionTitle,
        sectionSubtitle,
        instagramUrl,
        ctaLabel,
        ctaButtonText,
        gallery[] {
          image { asset->, alt },
          description
        }
      }
    `,
  PROGRAM_QUERIES: {
    PROGRAM_OVERVIEW_HERO_QUERY: `*[_type=="heroSection" && slug.current=="programs-overview"][0]{
      title { first, second, third },
      tagline,
      description,
      background { asset, alt },
      backgroundMobile { asset, alt },
      primaryCta { text, url, newTab },
      secondaryCta { text, action }
    }`,
    PROGRAM_SCEHDULES_QUERY: `*[_type == "program"] | order(title asc) {title, description, icon, schedule}`,
    PROGRAM_OVERVIEW_MINNOWFENCERS_QUERY: `*[_type == "minnowFencersSection"][0]{
          sectionTitle,
          headerDescription,
          slideShowImages[]{
            asset,
            alt,
            caption
          },
          programHighlights,
          classSchedule[]{
            day,
            startTime,
            endTime,
            weapon
          },
          pricing[]{
            label,
            price,
            note
          },
          terms,
          equipmentInfo,
          equipmentRequirements,
          sessionStructure[]{
            activity,
            duration
          },
          totalDuration,
          ctaText,
          registrationUrl,
          registrationSectionTitle,
          registrationSectionDescription,
          registrationPromoText,
          registrationPromoSubtext
        }`,
    PROGRAM_OVERVIEW_TEAMFENCERS_QUERY: `*[_type == "teamFencersSection"][0]{
              sectionTitle,
              headerDescription,
              slideShowImages[]{
                asset,
                alt,
                caption
              },
              programHighlights,
              practiceSchedule[]{
                day,
                time,
                weapon
              },
              pricingAmount,
              pricingNote,
              registrationSectionTitle,
              ctaText,
              registrationUrl,
              equipmentRequirements,
              aboutSectionTitle,
              aboutSectionDescription,
              trainingExpectationsTitle,
              trainingExpectations
            }`,
        PROGRAM_ADULT_FENCING_INFO_SECTION: `*[_type == "adultFencingInfoSection"][0]{
          sectionTitle,
          sectionTitleHighlight,
          headerDescription,
          mainDescription,
          featureTitle,
          features,
          mainCtaText,
          mainCtaUrl,
          secondaryCtaText,
          secondaryCtaTargetId,
          actionImage{
            asset,
            alt
          },
          statsBadge{
            stat,
            label
          }
        }`,
    PROGRAM_ADULT_FENCING_PROGRAM_SECTION: `*[_type == "adultProgramsSection"][0]{
              sectionTitle,
              sectionSubtitle,
              infoPanel{
                main,
                sub
              },
              chooseTitle,
              chooseSubtitle,
              chooseInstructions,
              programs[]{
                title,
                description,
                price,
                image{
                  asset,
                  alt
                },
                href,
                badge,
                recurring,
                schedule[]{
                  day,
                  time,
                  weapon
                }
              },
              bottomCtaPanel{
                leadText,
                registerText,
                registerHref
              }
            }`,
    PROGRAM_YOUTH_FENCING_INFO_SECTION: `*[_type == "youthFencingInfoSection"][0]{
              sectionTitle,
              sectionTitleHighlight,
              headerDescription,
              mainDescription,
              featureTitle,
              features,
              mainCtaText,
              mainCtaUrl,
              secondaryCtaText,
              secondaryCtaTargetId,
              actionImage{
                asset,
                alt
              },
              statsBadge{
                stat,
                label
              }
            }`,
    PROGRAM_YOUTH_FENCING_PROGRAM_SECTION: `*[_type == "youthProgramsSection"][0]{
              sectionTitle,
              sectionSubtitle,
              infoPanel{
                main,
                sub
              },
              chooseTitle,
              chooseSubtitle,
              chooseInstructions,
              programs[]{
                title,
                description,
                price,
                image{
                  asset,
                  alt
                },
                href,
                badge,
                schedule[]{
                  day,
                  time,
                  weapon
                }
              },
              bottomCtaPanel{
                leadText,
                registerText,
                registerHref
              }
            }`
  },

};
