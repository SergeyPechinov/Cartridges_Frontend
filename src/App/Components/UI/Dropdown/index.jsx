import React, {Component} from 'react';
import './Style.scss';

class Dropdown extends Component {

	state = {
		statusOpen: false,
		idOption: null,
		title: '',
	};

	classNameOpen = `dropdown--open`;

	openDropdown = () => {
		this.setState({
			statusOpen: true,
		});

		document.addEventListener('click', this.closeDropdownDocumentClick);
	};

	closeDropdown = event => {
		this.setState({
			statusOpen: false,
			idOption: event.target.dataset.id,
			title: event.target.textContent,
		});
	};

	closeDropdownDefault = () => {
		this.setState({
			statusOpen: false,
			idOption: null,
			title: '',
		})
	};

	closeDropdownDocumentClick = () => {
		this.setState({
			statusOpen: false,
		});

		document.removeEventListener('click', this.closeDropdownDocumentClick);
	};

	render() {
		const
				options = this.props.list ? this.props.list.map(item =>
						<span
								onClick={this.closeDropdown}
								data-id={item.id}
								className={`dropdown__option`}
								key={item.id}>
							{item.name}
						</span>
				) : null;

		return (
				<div
						data-id-option={this.state.idOption}
						className={`
              dropdown
              ${this.state.statusOpen ? this.classNameOpen : ''}
              ${this.props.class ? this.props.class : ''}
            `}>
					<div
							className={`dropdown__header`}
							onClick={this.openDropdown}>
						{
							this.state.title !== '' ?
									<span
											className={`dropdown__title`}>
										{this.state.title}</span>
									:
									<span
											className={`
												dropdown__title
												dropdown__title--default
											`}>
										{this.props.defaultValue}</span>
						}
						<span className={`dropdown__arrow`}>
						</span>
					</div>

					<div
							className={`dropdown__body`}>
						<div
								className={`dropdown__options`}>
							{this.state.idOption === null ? null :
									<span
											onClick={this.closeDropdownDefault}
											className={`
												dropdown__option
												dropdown__option--default`}
											key={-1}
									>{this.props.defaultValue}
										</span>
							}
							{options}
						</div>
					</div>
				</div>
		);
	}
}

export default Dropdown;