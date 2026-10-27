import { createFileRoute, notFound } from '@tanstack/react-router'
import { findService } from '../../data/services'
import { site } from '../../data/site'
import { ServicePage } from '../../components/ServicePage'

export const Route = createFileRoute('/services/$serviceId')({
  loader: ({ params }) => {
    const service = findService(params.serviceId)
    if (!service) throw notFound()
    return service
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} | ${site.name}` },
            { name: 'description', content: loaderData.shortDescription },
            {
              property: 'og:title',
              content: `${loaderData.name} | ${site.name}`,
            },
            {
              property: 'og:description',
              content: loaderData.shortDescription,
            },
          ],
        }
      : {},
  component: ServiceRoute,
})

function ServiceRoute() {
  const service = Route.useLoaderData()
  return <ServicePage key={service.id} service={service} />
}
