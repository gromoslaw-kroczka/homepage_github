import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  
  const { widget } = service;

  const { data: githubData, error: githubError } = useWidgetAPI(widget);

  if (githubError) {
    return <Container service={service} error={githubError} />;
  }

  if (!githubData) {
    return (
      <Container service={service}>
        <Block label="github.open_issues_count" />
        <Block label="github.stargazers_count" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="github.open_issues_count" value={githubData.open_issues_count} />
      <Block label="github.stargazers_count" value={githubData.stargazers_count} />
    </Container>
  );
}
