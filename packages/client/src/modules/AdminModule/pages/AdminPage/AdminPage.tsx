import React, { useRef } from "react";

import {
    NavbarGlobalComponent,
    NormalizedInput
} from "globalCompontents"

import { trpc } from "utils/trpc";
import "./AdminPage.scss";


export const AdminPage: React.FC = () => {
    const cathegoryRef = useRef<HTMLInputElement | null>(null);
    const offertRef = useRef<HTMLInputElement | null>(null);
    const addCathegory = trpc.admin.addCathegory.useMutation();
    const deleteOffert = trpc.admin.deleteOffert.useMutation();

    return (
        <div className="container">
            <NavbarGlobalComponent />
            <div className="content content-narrow">
                <section className="white-box">
                    <span className="header header-md">Add new Cathegory</span>
                    <form className="util-flex util-align-center util-end-second-axis"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!cathegoryRef.current?.value) return;
                            addCathegory.mutate({
                                cathegoryName: cathegoryRef.current?.value
                            });
                        }}>
                        <NormalizedInput placeholder="Cathegory Name" ref={cathegoryRef} />
                        <button className="submit-button util-h-max">Create</button>
                    </form>
                </section>

                <section className="white-box">
                    <span className="header header-md">Delete Offert</span>
                    <form className="util-flex util-align-center util-end-second-axis"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!offertRef.current?.value) return;
                            deleteOffert.mutate({
                                offertId: offertRef.current?.value
                            });
                        }}>
                        <NormalizedInput placeholder="Offert Id" ref={offertRef} />
                        <button className="submit-button util-h-max">Delete</button>
                    </form>
                </section>
            </div>
        </div>
    );
};
