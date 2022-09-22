import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { uiStore } from "../../hooks/useUiStore";

export const FabButton = () => {
    const { openDateModal } = uiStore();
    const { setActiveName } = useCalendarStore();

    const handleClickNew = () => {
        setActiveName({
            title: '',
            notes: '',
            start: new Date(),
            end: '',
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Fernando'
            },
        });
        openDateModal();
    }
    return (
        <button className="btn btn-primary fab">
            <i className="fas fa-plus" onClick={handleClickNew}></i>
        </button>
    )
}
