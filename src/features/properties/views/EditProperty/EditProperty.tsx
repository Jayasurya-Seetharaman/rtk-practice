import { useEditPropertyVM } from "../../viewmodels/useEditPropertyVM";
import { EditPropertyView } from "./EditProperty.view";

export function EditProperty() {
  const props = useEditPropertyVM();
  return <EditPropertyView {...props} />;
}
