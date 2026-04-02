import { usePropertiesVM } from "../../viewmodels/usePropertiesVM";
import { PropertiesListView } from "./PropertiesList.view";

export function PropertiesList() {
  const props = usePropertiesVM();
  return <PropertiesListView {...props} />;
}
